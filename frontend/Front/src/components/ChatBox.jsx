import { useEffect, useRef } from 'react';

function ChatBox({ messages, isLoading }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h3>Chat con el tutor</h3>
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        border: '1px solid #333', 
        borderRadius: '8px',
        padding: '1rem',
        backgroundColor: '#1e1e1e',
        minHeight: '400px',
        maxHeight: 'calc(100vh - 120px)'
      }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '12px',
                backgroundColor: msg.role === 'user' ? '#007acc' : '#2d2d2d',
                color: 'white',
                maxWidth: '85%',
              }}
            >
              <strong>{msg.role === 'user' ? 'Tú' : 'Tutor'}:</strong>
              <div style={{ whiteSpace: 'pre-wrap', marginTop: '4px', fontSize: '0.9rem' }}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ padding: '0.5rem 1rem', borderRadius: '12px', backgroundColor: '#2d2d2d', color: 'white' }}>
              El tutor está pensando...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default ChatBox;