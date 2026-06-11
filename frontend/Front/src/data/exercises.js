// src/data/exercises.js

export const MODULES_ORDER = [
  { id: 'funciones', name: 'Funciones', order: 1 },
  { id: 'variables', name: 'Uso de Variables', order: 2 },
  { id: 'ciclos', name: 'Ciclos', order: 3 },
  { id: 'condicionales', name: 'Estructuras Condicionales', order: 3 } // Mismo orden que ciclos
];

// Definición de ejercicios por módulo
export const EXERCISES = {
  funciones: {
    moduleId: 'funciones',
    moduleName: 'Funciones',
    exercises: [
      {
        id: 1,
        title: 'Función de saludo',
        description: 'Crea una función llamada "saludar" que reciba un nombre como parámetro y muestre "Hola, [nombre]!"',
        initialCode: '# Define tu función aquí\ndef saludar(nombre):\n    # Completa la función\n    pass\n\n# Prueba tu función\nsaludar("Juan")',
        validation: (output, code) => {
          return code.includes('def saludar') && output.includes('Hola');
        }
      },
      {
        id: 2,
        title: 'Función de área',
        description: 'Crea una función que calcule el área de un rectángulo (base * altura).',
        initialCode: '# Define tu función aquí\ndef area_rectangulo(base, altura):\n    # Calcula y retorna el área\n    pass\n\n# Prueba\nprint(area_rectangulo(5, 3))',
        validation: (output, code) => {
          return code.includes('def area_rectangulo') && /15/.test(output);
        }
      }
    ]
  },
  
  variables: {
    moduleId: 'variables',
    moduleName: 'Uso de Variables',
    exercises: [
      {
        id: 1,
        title: 'Intercambio de variables',
        description: 'Dadas dos variables a=5 y b=10, intercambia sus valores para que a=10 y b=5.',
        initialCode: 'a = 5\nb = 10\n# Escribe tu código para intercambiar los valores\nprint(f"a = {a}, b = {b}")',
        validation: (output, code) => {
          return output.includes('a = 10') && output.includes('b = 5');
        }
      },
      {
        id: 2,
        title: 'Calculadora de promedio',
        description: 'Crea variables para almacenar 3 calificaciones y calcula su promedio.',
        initialCode: '# Define las calificaciones\ncalificacion1 = 85\ncalificacion2 = 90\ncalificacion3 = 78\n# Calcula y muestra el promedio',
        validation: (output, code) => {
          return /8[0-9]\.?[0-9]*/.test(output) || /promedio/.test(output.toLowerCase());
        }
      }
    ]
  },
  
  ciclos: {
    moduleId: 'ciclos',
    moduleName: 'Ciclos',
    exercises: [
      {
        id: 1,
        title: 'Tabla de multiplicar',
        description: 'Usa un ciclo for para mostrar la tabla de multiplicar del 5 (del 1 al 10).',
        initialCode: '# Escribe tu código aquí\nnumero = 5\n# Usa un ciclo for para mostrar la tabla',
        validation: (output, code) => {
          return code.includes('for') && output.includes('5') && output.includes('10');
        }
      },
      {
        id: 2,
        title: 'Cuenta regresiva',
        description: 'Usa un ciclo while para mostrar una cuenta regresiva del 10 al 1.',
        initialCode: '# Escribe tu código aquí\ncontador = 10\n# Usa un ciclo while',
        validation: (output, code) => {
          return (code.includes('while') || code.includes('for')) && 
                 output.includes('10') && output.includes('1');
        }
      }
    ]
  },
  
  condicionales: {
    moduleId: 'condicionales',
    moduleName: 'Estructuras Condicionales',
    exercises: [
      {
        id: 1,
        title: 'Clasificación de edad',
        description: 'Clasifica a una persona según su edad: niño (0-12), adolescente (13-17), adulto (18-64), anciano (65+).',
        initialCode: 'edad = int(input("Ingresa tu edad: "))\n# Usa if/elif/else para clasificar',
        validation: (output, code) => {
          return code.includes('if') && (code.includes('elif') || code.includes('else'));
        }
      },
      {
        id: 2,
        title: 'Calculadora de IMC',
        description: 'Calcula el IMC (peso/altura^2) y muestra si es bajo, normal, sobrepeso u obesidad.',
        initialCode: 'peso = float(input("Ingresa tu peso en kg: "))\naltura = float(input("Ingresa tu altura en metros: "))\n# Calcula IMC y clasifica',
        validation: (output, code) => {
          return code.includes('if') && (output.includes('normal') || output.includes('bajo') || output.includes('sobrepeso'));
        }
      }
    ]
  }
};

// Obtener módulos desbloqueados según progreso
export const getUnlockedModules = (completedModules) => {
  const unlocked = [];
  
  for (const module of MODULES_ORDER) {
    // Verificar si todos los módulos anteriores están completados
    const previousModules = MODULES_ORDER.filter(m => m.order < module.order);
    const allPreviousCompleted = previousModules.every(m => completedModules.includes(m.id));
    
    if (allPreviousCompleted || module.order === 1) {
      unlocked.push(module.id);
    } else {
      break; // No desbloquear módulos posteriores si falta alguno
    }
  }
  
  return unlocked;
};

// Verificar si un módulo está completo
export const isModuleComplete = (moduleId, completedExercises) => {
  const moduleExercises = EXERCISES[moduleId]?.exercises || [];
  const moduleCompleted = moduleExercises.every(ex => 
    completedExercises.includes(`${moduleId}_${ex.id}`)
  );
  return moduleCompleted;
};