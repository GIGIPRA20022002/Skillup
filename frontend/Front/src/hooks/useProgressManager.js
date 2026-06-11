// src/hooks/useProgressManager.js
import { useState, useEffect } from 'react';
import { EXERCISES, getUnlockedModules, isModuleComplete } from '../data/exercises';

const STORAGE_KEY = 'python_learning_progress';

const loadProgress = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    completedExercises: [], // IDs: "logica_1", "funciones_2", etc.
    currentModule: 'logica'
  };
};

const saveProgress = (progress) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

function useProgressManager() {
  const [progress, setProgress] = useState(loadProgress);
  const [unlockedModules, setUnlockedModules] = useState([]);
  const [allModulesCompleted, setAllModulesCompleted] = useState(false);

  // Calcular módulos desbloqueados según ejercicios completados
  useEffect(() => {
    const completedModules = [];
    
    for (const module of Object.keys(EXERCISES)) {
      if (isModuleComplete(module, progress.completedExercises)) {
        completedModules.push(module);
      }
    }
    
    const unlocked = getUnlockedModules(completedModules);
    setUnlockedModules(unlocked);
    
    // Verificar si todos los módulos están completados
    const allModules = Object.keys(EXERCISES);
    const allCompleted = allModules.every(m => completedModules.includes(m));
    setAllModulesCompleted(allCompleted);
    
    // Si el módulo actual no está desbloqueado, cambiar al primer desbloqueado
    if (!unlocked.includes(progress.currentModule) && unlocked.length > 0) {
      setProgress(prev => ({ ...prev, currentModule: unlocked[0] }));
    }
  }, [progress.completedExercises, progress.currentModule]);

  const completeExercise = (moduleId, exerciseId) => {
    const exerciseKey = `${moduleId}_${exerciseId}`;
    if (!progress.completedExercises.includes(exerciseKey)) {
      const newCompleted = [...progress.completedExercises, exerciseKey];
      setProgress(prev => ({ ...prev, completedExercises: newCompleted }));
      saveProgress({ ...progress, completedExercises: newCompleted });
      return true;
    }
    return false;
  };

  const setCurrentModule = (moduleId) => {
    if (unlockedModules.includes(moduleId)) {
      setProgress(prev => ({ ...prev, currentModule: moduleId }));
      saveProgress({ ...progress, currentModule: moduleId });
      return true;
    }
    return false;
  };

  const isExerciseCompleted = (moduleId, exerciseId) => {
    return progress.completedExercises.includes(`${moduleId}_${exerciseId}`);
  };

  const getCurrentModuleExercises = () => {
    return EXERCISES[progress.currentModule]?.exercises || [];
  };

  const isModuleUnlocked = (moduleId) => {
    return unlockedModules.includes(moduleId);
  };

  const getModuleProgress = (moduleId) => {
    const exercises = EXERCISES[moduleId]?.exercises || [];
    const completed = exercises.filter(ex => 
      progress.completedExercises.includes(`${moduleId}_${ex.id}`)
    ).length;
    return { completed, total: exercises.length };
  };

  return {
    progress,
    unlockedModules,
    allModulesCompleted,
    currentModule: progress.currentModule,
    setCurrentModule,
    completeExercise,
    isExerciseCompleted,
    getCurrentModuleExercises,
    isModuleUnlocked,
    getModuleProgress
  };
}

export default useProgressManager;