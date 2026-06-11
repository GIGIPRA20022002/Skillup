// src/App.jsx - VERSIÓN COMPLETA CON SISTEMA DE EJERCICIOS
import { useState } from 'react';
import LevelMap from './components/LevelMap';
import ExercisePanel from './components/ExercisePanel';
import ChatBox from './components/ChatBox';
import useProgressManager from './hooks/useProgressManager';
import { evaluateCode } from './services/api';
import { EXERCISES } from './data/exercises';

function App() {
  const {
    currentModule,
    setCurrentModule,
    completeExercise,
    isExerciseCompleted,
    getCurrentModuleExercises,
    isModuleUnlocked,
    getModuleProgress,
    allModulesCompleted
  } = useProgressManager();

  const [currentCode, setCurrentCode] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Bienvenido! Completa los ejercicios de cada módulo para desbloquear nuevos niveles. ¡Comienza con el primer ejercicio!' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const currentExercises = getCurrentModuleExercises();
  const moduleData = EXERCISES[currentModule];

  // Cargar el código inicial del ejercicio actual
  const getInitialCodeForExercise = (exerciseId) => {
    const exercise = currentExercises.find(ex => ex.id === exerciseId);
    return exercise?.initialCode || '# Escribe tu código aquí';
  };

  const handleSelectModule = (moduleId) => {
    setCurrentModule(moduleId);
    // Resetear código al primer ejercicio del nuevo módulo
    const firstExercise = EXERCISES[moduleId]?.exercises[0];
    if (firstExercise) {
      setCurrentCode(firstExercise.initialCode);
    }
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: `Has entrado al módulo: ${moduleData?.moduleName || moduleId}. Completa los ejercicios para avanzar.` 
    }]);
  };

  const handleSubmitCode = async (exercise, moduleId) => {
    const exerciseKey = `${moduleId}_${exercise.id}`;
    
    if (isExerciseCompleted(moduleId, exercise.id)) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '✅ Este ejercicio ya lo completaste. ¡Continúa con el siguiente!' 
      }]);
      return;
    }

    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: currentCode }]);

    try {
      // Evaluar el código con el backend
      const response = await evaluateCode(currentCode, moduleId, 'estudiante123');
      
      // Verificar si el código no tiene errores (según el backend)
      const isCodeCorrect = response.status === 'success' && response.detected_error === null;
      
      if (isCodeCorrect) {
        // Marcar ejercicio como completado
        completeExercise(moduleId, exercise.id);
        
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `🎉 ¡Excelente! Has completado el ejercicio "${exercise.title}".\n\n${response.tutor_message || '¡Sigue así!'}` 
        }]);
        
        // Cargar siguiente ejercicio si existe
        const currentIndex = currentExercises.findIndex(ex => ex.id === exercise.id);
        const nextExercise = currentExercises[currentIndex + 1];
        if (nextExercise) {
          setCurrentCode(nextExercise.initialCode);
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: `📝 Ahora pasa al siguiente ejercicio: "${nextExercise.title}"\n\n${nextExercise.description}` 
          }]);
        } else {
          // Verificar si el módulo está completo
          const allCompleted = currentExercises.every(ex => 
            isExerciseCompleted(moduleId, ex.id) || ex.id === exercise.id
          );
          if (allCompleted) {
            setMessages(prev => [...prev, { 
              role: 'assistant', 
              content: `🏆 ¡Felicidades! Has completado todos los ejercicios del módulo "${moduleData?.moduleName}". ¡Has desbloqueado nuevos niveles!` 
            }]);
          }
        }
      } else {
        // Código con errores
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `❌ Tu código tiene errores.\n\n${response.tutor_message || 'Revisa la lógica y vuelve a intentarlo.'}` 
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Hubo un error al evaluar tu código. Intenta de nuevo.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (newCode) => {
    setCurrentCode(newCode);
  };

  // Al cargar el módulo por primera vez, cargar el código del primer ejercicio
  if (moduleData && currentExercises.length > 0 && !currentCode) {
    setCurrentCode(currentExercises[0].initialCode);
  }

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <h1 style={{ textAlign: 'center', padding: '1rem', margin: 0, backgroundColor: '#1e1e1e', color: 'white' }}>
        {allModulesCompleted ? '🏆 ¡Felicidades! Completaste todo el curso 🏆' : 'Aprende Python'}
      </h1>
      
      <div style={{ display: 'flex', flex: 1, gap: '1rem', padding: '1rem', overflow: 'hidden' }}>
        {/* Columna izquierda: Mapa de niveles */}
        <div style={{ width: '280px', borderRight: '1px solid #333', paddingRight: '1rem', overflow: 'auto' }}>
          <LevelMap 
            currentModule={currentModule} 
            onSelectModule={handleSelectModule}
            isModuleUnlocked={isModuleUnlocked}
            getModuleProgress={getModuleProgress}
          />
        </div>
        
        {/* Columna central: Panel de ejercicios */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 0, overflow: 'auto' }}>
          {moduleData && (
            <ExercisePanel
              moduleId={currentModule}
              exercises={currentExercises}
              completedExercises={[]} // Se pasa pero usamos isExerciseCompleted internamente
              onCompleteExercise={completeExercise}
              currentCode={currentCode}
              onCodeChange={handleCodeChange}
              onSubmitCode={handleSubmitCode}
              isLoading={isLoading}
            />
          )}
        </div>
        
        {/* Columna derecha: Chat */}
        <div style={{ width: '350px', borderLeft: '1px solid #333', paddingLeft: '1rem', overflow: 'auto' }}>
          <ChatBox messages={messages} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;