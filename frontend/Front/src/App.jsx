import { useState } from 'react';
import LevelMap from './components/LevelMap';
import CodeEditor from './components/CodeEditor';
import ChatBox from './components/ChatBox';
import { evaluateCode } from './services/api';

function App() {
  const [currentModule, setCurrentModule] = useState('ciclos');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! Escribe tu código y te ayudaré a mejorarlo.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitCode = async (code) => {
    // Añadir mensaje del usuario al chat
    setMessages(prev => [...prev, { role: 'user', content: code }]);
    setIsLoading(true);

    try {
      const response = await evaluateCode(code, currentModule, 'estudiante123');
      
      // Añadir respuesta del tutor
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.tutor_message 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Hubo un error. Intenta de nuevo.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <h1 style={{ textAlign: 'center', padding: '1rem', margin: 0, backgroundColor: '#1e1e1e', color: 'white' }}>
        Aprende Python
      </h1>
      
      <div style={{ display: 'flex', flex: 1, gap: '1rem', padding: '1rem', overflow: 'hidden' }}>
        {/* Columna izquierda: Mapa de niveles */}
        <div style={{ width: '250px', borderRight: '1px solid #333', paddingRight: '1rem' }}>
          <LevelMap 
            currentModule={currentModule} 
            onSelectModule={setCurrentModule} 
          />
        </div>
        
        {/* Columna central: Editor de código */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 0 }}>
          <CodeEditor onSubmit={handleSubmitCode} isLoading={isLoading} />
        </div>
        
        {/* Columna derecha: Chat */}
        <div style={{ width: '350px', borderLeft: '1px solid #333', paddingLeft: '1rem' }}>
          <ChatBox messages={messages} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;