import { useState } from 'react';
import Editor from '@monaco-editor/react';

function CodeEditor({ onSubmit, isLoading }) {
  const [code, setCode] = useState('# Escribe tu código aquí\nprint("Hola mundo")');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, minHeight: '400px', border: '1px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
        <Editor
          height="100%"
          defaultLanguage="python"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            tabSize: 4,
          }}
        />
      </div>
      <button
        onClick={() => onSubmit(code)}
        disabled={isLoading}
        style={{
          marginTop: '1rem',
          padding: '0.75rem',
          backgroundColor: isLoading ? '#555' : '#007acc',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          fontSize: '1rem',
          fontWeight: 'bold',
          transition: 'background-color 0.2s'
        }}
      >
        {isLoading ? 'Evaluando...' : 'Evaluar código'}
      </button>
    </div>
  );
}

export default CodeEditor;