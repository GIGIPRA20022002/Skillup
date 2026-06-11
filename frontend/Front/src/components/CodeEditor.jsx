// src/components/CodeEditor.jsx - VERSIÓN ACTUALIZADA
import Editor from '@monaco-editor/react';

function CodeEditor({ code, onChange, onSubmit, isLoading, readOnly = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, minHeight: '300px', border: '1px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
        <Editor
          height="100%"
          defaultLanguage="python"
          theme="vs-dark"
          value={code}
          onChange={(value) => onChange(value || '')}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            tabSize: 4,
            readOnly: readOnly
          }}
        />
      </div>
      <button
        onClick={onSubmit}
        disabled={isLoading || readOnly}
        style={{
          marginTop: '1rem',
          padding: '0.75rem',
          backgroundColor: (isLoading || readOnly) ? '#555' : '#007acc',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: (isLoading || readOnly) ? 'not-allowed' : 'pointer',
          fontSize: '1rem',
          fontWeight: 'bold',
          transition: 'background-color 0.2s'
        }}
      >
        {isLoading ? 'Evaluando...' : readOnly ? '✓ Completado' : 'Evaluar código'}
      </button>
    </div>
  );
}

export default CodeEditor;