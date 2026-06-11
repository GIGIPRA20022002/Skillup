// src/components/LevelMap.jsx - VERSIÓN ACTUALIZADA
import { MODULES_ORDER, EXERCISES } from '../data/exercises';

function LevelMap({ currentModule, onSelectModule, isModuleUnlocked, getModuleProgress }) {
  return (
    <div>
      <h3>Niveles</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {MODULES_ORDER.map(mod => {
          const isUnlocked = isModuleUnlocked(mod.id);
          const progress = getModuleProgress(mod.id);
          const isCompleted = progress.completed === progress.total && progress.total > 0;
          
          return (
            <li key={mod.id} style={{ marginBottom: '0.5rem' }}>
              <button
                onClick={() => isUnlocked && onSelectModule(mod.id)}
                disabled={!isUnlocked}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: currentModule === mod.id ? '#007acc' : 
                                  isCompleted ? '#4caf50' : '#2d2d2d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: isUnlocked ? 'pointer' : 'not-allowed',
                  opacity: isUnlocked ? 1 : 0.5,
                  fontSize: '1rem',
                  textAlign: 'left',
                  transition: 'background-color 0.2s',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>
                    {isCompleted ? '✓ ' : (isUnlocked ? '🔓' : '🔒')} {mod.name}
                  </span>
                  {progress.total > 0 && (
                    <span style={{ fontSize: '0.7rem', backgroundColor: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '10px' }}>
                      {progress.completed}/{progress.total}
                    </span>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LevelMap;