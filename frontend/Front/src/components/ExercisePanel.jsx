// src/components/ExercisePanel.jsx
import { useState } from 'react';
import ExerciseCard from './ExerciseCard';

function ExercisePanel({ 
  moduleId, 
  exercises, 
  completedExercises, 
  onCompleteExercise,
  currentCode,
  onCodeChange,
  onSubmitCode,
  isLoading 
}) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const currentExercise = exercises[currentExerciseIndex];
  const isCurrentCompleted = completedExercises.includes(`${moduleId}_${currentExercise?.id}`);

  const handleNext = () => {
    if (currentExerciseIndex + 1 < exercises.length) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentExerciseIndex - 1 >= 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  const allCompleted = exercises.every(ex => 
    completedExercises.includes(`${moduleId}_${ex.id}`)
  );

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Barra de progreso del módulo */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ 
          backgroundColor: '#2d2d2d', 
          borderRadius: '10px', 
          height: '8px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${(completedExercises.filter(id => id.startsWith(moduleId)).length / exercises.length) * 100}%`,
            backgroundColor: '#4caf50',
            height: '100%',
            transition: 'width 0.3s'
          }} />
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '0.25rem',
          fontSize: '0.8rem',
          color: '#aaa'
        }}>
          <span>Progreso del módulo</span>
          <span>{completedExercises.filter(id => id.startsWith(moduleId)).length}/{exercises.length}</span>
        </div>
      </div>

      {/* Navegación de ejercicios */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {exercises.map((ex, idx) => (
          <button
            key={ex.id}
            onClick={() => setCurrentExerciseIndex(idx)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: currentExerciseIndex === idx ? '#007acc' : 
                              completedExercises.includes(`${moduleId}_${ex.id}`) ? '#4caf50' : '#2d2d2d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            {completedExercises.includes(`${moduleId}_${ex.id}`) ? '✓ ' : ''}
            Ejercicio {ex.id}
          </button>
        ))}
      </div>

      {/* Tarjeta del ejercicio actual */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <ExerciseCard
          exercise={currentExercise}
          isCompleted={isCurrentCompleted}
          currentCode={currentCode}
          onCodeChange={onCodeChange}
          onSubmit={() => onSubmitCode(currentExercise, moduleId)}
          isLoading={isLoading}
        />
      </div>

      {/* Botones de navegación */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <button
          onClick={handlePrevious}
          disabled={currentExerciseIndex === 0}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: currentExerciseIndex === 0 ? '#555' : '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: currentExerciseIndex === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          ← Anterior
        </button>
        
        {allCompleted ? (
          <div style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: '#4caf50', 
            color: 'white',
            borderRadius: '6px'
          }}>
            🎉 ¡Módulo Completado!
          </div>
        ) : (
          <button
            onClick={handleNext}
            disabled={currentExerciseIndex + 1 >= exercises.length}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: currentExerciseIndex + 1 >= exercises.length ? '#555' : '#007acc',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: currentExerciseIndex + 1 >= exercises.length ? 'not-allowed' : 'pointer'
            }}
          >
            Siguiente →
          </button>
        )}
      </div>
    </div>
  );
}

export default ExercisePanel;