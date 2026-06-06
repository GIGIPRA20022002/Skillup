function ModuleLock({ moduleId, isUnlocked, isCurrent, onSelect }) {
  return (
    <button
      onClick={() => isUnlocked && onSelect(moduleId)}
      disabled={!isUnlocked}
      style={{
        width: '100%',
        padding: '0.75rem',
        backgroundColor: isCurrent ? '#007acc' : '#2d2d2d',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: isUnlocked ? 'pointer' : 'not-allowed',
        opacity: isUnlocked ? 1 : 0.5,
        fontSize: '1rem',
        textAlign: 'left',
        transition: 'background-color 0.2s'
      }}
    >
      {isUnlocked ? '🔓' : '🔒'} {moduleId}
    </button>
  );
}

export default ModuleLock;