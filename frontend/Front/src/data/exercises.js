// src/data/exercises.js
// ✅ ESTRUCTURA ACTUALIZADA - Ahora es fácil agregar ejercicios
// Los ejercicios se definen en ejercicios-estructura.json
// El profesor puede editar ese archivo directamente para agregar nuevos

export const MODULES_ORDER = [
  { id: 'funciones', name: 'Funciones', order: 1 },
  { id: 'variables', name: 'Uso de Variables', order: 2 },
  { id: 'ciclos', name: 'Ciclos', order: 3 },
  { id: 'condicionales', name: 'Estructuras Condicionales', order: 4 }
];

// Datos de ejercicios (puedes copiar de ejercicios-estructura.json)
const EXERCISES_DATA = {
  funciones: {
    moduleId: 'funciones',
    moduleName: 'Funciones',
    exercises: [
      {
        id: 1,
        title: 'Función de saludo',
        description: 'Crea una función llamada "saludar" que reciba un nombre como parámetro y muestre "Hola, [nombre]!"',
        initialCode: '# Define tu función aquí\ndef saludar(nombre):\n    # Completa la función\n    pass\n\n# Prueba tu función\nsaludar("Juan")'
      },
      {
        id: 2,
        title: 'Función de área',
        description: 'Crea una función que calcule el área de un rectángulo (base * altura).',
        initialCode: '# Define tu función aquí\ndef area_rectangulo(base, altura):\n    # Calcula y retorna el área\n    pass\n\n# Prueba\nprint(area_rectangulo(5, 3))'
      },
      {
        id: 3,
        title: 'Calcular Total',
        description: 'Crea una función que retorne el total de una compra.',
        initialCode: 'def calcular_total(precios):\n    # Retorna valor\n    pass'
      },
      {
        id: 4,
        title: 'Nivel de Jugador',
        description: 'Retorna el nivel de un jugador según su experiencia.',
        initialCode: 'def nivel_jugador(exp):\n    # Devuelve nivel\n    pass'
      },
      {
        id: 5,
        title: 'Promedio de Notas',
        description: 'Calcula y retorna el promedio de una lista de notas.',
        initialCode: 'def promedio(notas):\n    # Calcula promedio\n    pass'
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
        initialCode: 'a = 5\nb = 10\n# Escribe tu código para intercambiar los valores\nprint(f"a = {a}, b = {b}")'
      },
      {
        id: 2,
        title: 'Calculadora de promedio',
        description: 'Crea variables para almacenar 3 calificaciones y calcula su promedio.',
        initialCode: '# Define las calificaciones\ncalificacion1 = 85\ncalificacion2 = 90\ncalificacion3 = 78\n# Calcula y muestra el promedio'
      },
      {
        id: 3,
        title: 'Inventario de Tienda',
        description: 'Declara variables con nombres claros para almacenar el nombre del juego, precio y cantidad disponible.',
        initialCode: 'def inventario():\n    # Declara variables descriptivas\n    pass'
      },
      {
        id: 4,
        title: 'Sistema de Cuenta Bancaria',
        description: 'Crea variables para saldo, número de cuenta y nombre del titular usando buenas prácticas.',
        initialCode: 'def cuenta_bancaria():\n    # Define variables correctamente\n    pass'
      },
      {
        id: 5,
        title: 'Perfil de Jugador',
        description: 'Define variables para nombre del jugador, nivel y puntos de experiencia.',
        initialCode: 'def perfil_jugador():\n    # Crea variables claras\n    pass'
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
        initialCode: '# Escribe tu código aquí\nnumero = 5\n# Usa un ciclo for para mostrar la tabla'
      },
      {
        id: 2,
        title: 'Cuenta regresiva',
        description: 'Usa un ciclo while para mostrar una cuenta regresiva del 10 al 1.',
        initialCode: '# Escribe tu código aquí\ncontador = 10\n# Usa un ciclo while'
      },
      {
        id: 3,
        title: 'Conteo de Monedas',
        description: 'Usa un ciclo para contar monedas en una lista.',
        initialCode: 'def contar_monedas(monedas):\n    # Usa un ciclo seguro\n    pass'
      },
      {
        id: 4,
        title: 'Recorrer Inventario',
        description: 'Recorre una lista de productos mostrando cada uno.',
        initialCode: 'def mostrar_productos(productos):\n    # Recorre la lista\n    pass'
      },
      {
        id: 5,
        title: 'Experiencia de Jugador',
        description: 'Suma puntos de experiencia usando un ciclo for.',
        initialCode: 'def sumar_experiencia(puntos):\n    # Usa ciclo for\n    pass'
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
        initialCode: 'edad = int(input("Ingresa tu edad: "))\n# Usa if/elif/else para clasificar'
      },
      {
        id: 2,
        title: 'Calculadora de IMC',
        description: 'Calcula el IMC (peso/altura^2) y muestra si es bajo, normal, sobrepeso u obesidad.',
        initialCode: 'peso = float(input("Ingresa tu peso en kg: "))\naltura = float(input("Ingresa tu altura en metros: "))\n# Calcula IMC y clasifica'
      },
      {
        id: 3,
        title: 'Validación de Edad',
        description: 'Determina si un usuario es mayor de edad usando condicionales.',
        initialCode: 'def validar_edad(edad):\n    # Usa condicionales\n    pass'
      },
      {
        id: 4,
        title: 'Sistema de Descuentos',
        description: 'Aplica descuentos según el monto de compra usando lógica booleana.',
        initialCode: 'def calcular_descuento(total):\n    # Aplica condiciones\n    pass'
      },
      {
        id: 5,
        title: 'Estado del Jugador',
        description: 'Determina si un jugador está vivo o eliminado según su vida.',
        initialCode: 'def estado_jugador(vida):\n    # Evalúa condiciones\n    pass'
      }
    ]
  }
};

export const EXERCISES = EXERCISES_DATA;

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