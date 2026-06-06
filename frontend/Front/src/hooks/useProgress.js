import { useState, useEffect } from 'react';
import { getProgress } from '../services/api';

function useProgress(studentId) {
  const [progress, setProgress] = useState({
    unlocked_modules: ['logica', 'variables', 'funciones'],
    current_module: 'ciclos',
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const data = await getProgress(studentId);
        setProgress({
          ...data,
          loading: false,
          error: null
        });
      } catch (error) {
        setProgress(prev => ({
          ...prev,
          loading: false,
          error: 'Error al cargar el progreso'
        }));
      }
    };

    fetchProgress();
  }, [studentId]);

  return progress;
}

export default useProgress;