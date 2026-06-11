// src/components/ExerciseCard.jsx
import CodeEditor from './CodeEditor';

function ExerciseCard({ exercise, isCompleted, currentCode, onCodeChange, onSubmit, isLoading }) {
  if (!exercise) return <div>Cargando ejercicio...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Enunciado del ejercicio */}
      <div style={{
        backgroundColor: '#2d2d2d',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '1rem'
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#4caf50' }}>
          {isCompleted && '✓ '}{exercise.title}
        </h3>
        <p style={{ margin: 0, color: '#ccc', lineHeight: '1.5' }}>
          {exercise.description}
        </p>
      </div>

      {/* Editor de código */}
      <div style={{ flex: 1 }}>
        <CodeEditor
          code={currentCode}
          onChange={onCodeChange}
          onSubmit={onSubmit}
          isLoading={isLoading}
          readOnly={isCompleted}
        />
      </div>
    </div>
  );
}

export default ExerciseCard;