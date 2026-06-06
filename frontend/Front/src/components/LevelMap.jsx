const modules = [
  { id: 'logica', name: '🔒 Lógica', unlocked: true },
  { id: 'variables', name: '🔒 Variables', unlocked: true },
  { id: 'funciones', name: '🔒 Funciones', unlocked: true },
  { id: 'ciclos', name: '🔓 Ciclos', unlocked: true },
  { id: 'listas', name: '🔒 Listas', unlocked: false },
];

function LevelMap({ currentModule, onSelectModule }) {
  return (
    <div>
      <h3>Niveles</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {modules.map(mod => (
          <li key={mod.id} style={{ marginBottom: '0.5rem' }}>
            <button
              onClick={() => mod.unlocked && onSelectModule(mod.id)}
              disabled={!mod.unlocked}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: currentModule === mod.id ? '#007acc' : '#2d2d2d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: mod.unlocked ? 'pointer' : 'not-allowed',
                opacity: mod.unlocked ? 1 : 0.5,
                fontSize: '1rem',
                textAlign: 'left',
                transition: 'background-color 0.2s'
              }}
            >
              {mod.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LevelMap;