# 📚 SkillUP - Guía para Profesores: Agregar Ejercicios

## ¿Cómo funciona?

El sistema de ejercicios de SkillUP está diseñado para ser **muy fácil de personalizar**. Los profesores pueden agregar nuevos ejercicios sin tocar código, solo editando un archivo JSON.

---

## 📁 Archivos Importantes

### Para agregar ejercicios:
- **`ejercicios-estructura.json`** ← Aquí va tu plantilla de ejercicios
- **`frontend/Front/src/data/exercises.js`** ← El frontend los carga desde aquí

### El flujo:
1. El profesor edita `ejercicios-estructura.json`
2. Copia los ejercicios a `frontend/Front/src/data/exercises.js`
3. El frontend automáticamente los muestra ✅

---

## 📝 Cómo agregar un nuevo ejercicio

### Paso 1: Abre el archivo `frontend/Front/src/data/exercises.js`

### Paso 2: Encuentra el módulo donde quieres agregar el ejercicio

Hay 4 módulos disponibles:
- `funciones` - Funciones en Python
- `variables` - Uso de variables
- `ciclos` - Ciclos for y while
- `condicionales` - if, elif, else

### Paso 3: Copia este template y reemplaza los valores

```javascript
{
  id: 6,  // ⚠️ Debe ser único dentro del módulo (último id + 1)
  title: 'Tu título descriptivo',
  description: 'Explicación clara de qué debe hacer el estudiante',
  initialCode: 'def mi_funcion():\n    # Tu código inicial aquí\n    pass'
}
```

### Paso 4: Agrégalo a la lista de ejercicios del módulo

**Ejemplo: Agregar ejercicio en el módulo "funciones"**

```javascript
funciones: {
  moduleId: 'funciones',
  moduleName: 'Funciones',
  exercises: [
    // ... ejercicios existentes (id: 1, 2, 3, 4, 5) ...
    
    // ✅ NUEVO EJERCICIO
    {
      id: 6,
      title: 'Función para duplicar',
      description: 'Crea una función que reciba un número y retorne el doble.',
      initialCode: 'def duplicar(numero):\n    # Retorna el doble\n    pass\n\nprint(duplicar(5))  # Debe imprimir 10'
    }
  ]
}
```

---

## ⚙️ Estructura del Ejercicio Explicada

| Campo | Ejemplo | Descripción |
|-------|---------|-------------|
| `id` | `6` | Número único dentro del módulo. Debe incrementarse (1, 2, 3...) |
| `title` | `"Función para duplicar"` | Título corto del ejercicio |
| `description` | `"Crea una función..."` | Explicación clara de la tarea |
| `initialCode` | `"def duplicar()..."` | Código inicial que ve el estudiante en el editor |

---

## 🎯 Tips Importantes

### ✅ BIEN:
```javascript
{
  id: 6,
  title: 'Sumar dos números',
  description: 'Crea una función que reciba dos números y retorne su suma.',
  initialCode: 'def sumar(a, b):\n    # Tu código aquí\n    pass'
}
```

### ❌ MAL:
```javascript
{
  id: 6.5,  // ❌ Debe ser número entero
  title: 'Ejercicio 6',  // ❌ Muy vago
  description: 'Haz algo',  // ❌ No es claro
  initialCode: ''  // ❌ Ayuda al estudiante con un template
}
```

---

## 📊 Orden y Desbloqueo de Módulos

Los módulos se desbloquean en este orden:

1. **Funciones** (desbloqueado desde el inicio)
2. **Variables** (se desbloquea cuando completes Funciones)
3. **Ciclos** (se desbloquea cuando completes Variables)
4. **Condicionales** (se desbloquea cuando completes Ciclos)

**NO cambies el campo `order` en `MODULES_ORDER`**, sino el desbloqueo no funcionará correctamente.

---

## 🧪 Probar los cambios

1. Edita `frontend/Front/src/data/exercises.js`
2. Guarda el archivo
3. Si el frontend está corriendo en desarrollo (con `npm run dev`), verás los cambios automáticamente
4. ¡Listo! El nuevo ejercicio debe aparecer en el módulo correspondiente

---

## 🚀 Ejemplo Completo: Agregar 2 ejercicios nuevos

Si quieres agregar 2 ejercicios al módulo "variables" (que ya tiene 5):

```javascript
variables: {
  moduleId: 'variables',
  moduleName: 'Uso de Variables',
  exercises: [
    // ... ejercicios 1-5 existentes ...
    
    // ✅ NUEVO: Ejercicio 6
    {
      id: 6,
      title: 'Conversión de temperaturas',
      description: 'Crea variables para convertir de Celsius a Fahrenheit. Fórmula: F = (C * 9/5) + 32',
      initialCode: 'celsius = 25\n# Convierte a Fahrenheit y muestra el resultado\n# Formula: F = (C * 9/5) + 32'
    },
    
    // ✅ NUEVO: Ejercicio 7
    {
      id: 7,
      title: 'Información de película',
      description: 'Crea variables para almacenar: nombre, año, director y duración de una película.',
      initialCode: '# Define variables con información de una película\n# Ejemplo: Matrix\npelicula_nombre = ""\n# Agrega más variables...'
    }
  ]
}
```

---

## ❓ Preguntas Frecuentes

**P: ¿Cuántos ejercicios puedo agregar?**
A: Los que quieras. No hay límite.

**P: ¿Qué pasa si tengo 2 ejercicios con el mismo `id`?**
A: Será un problema. Cada ID debe ser único dentro del módulo.

**P: ¿Puedo cambiar el nombre de los módulos?**
A: NO. Los módulos son: `funciones`, `variables`, `ciclos`, `condicionales`. Si cambias los nombres, el sistema no funcionará.

**P: ¿Puedo agregar un nuevo módulo?**
A: Sí, pero necesitarás editar también `MODULES_ORDER` y el backend. Contacta al equipo de desarrollo.

**P: ¿Los estudiantes pueden guardar su progreso?**
A: Sí, se guarda localmente en el navegador (localStorage). En futuras versiones se guardará en una BD.

---

## 📞 Soporte

Si encuentras problemas:
1. Verifica que el JSON sea válido (usa un validador JSON online)
2. Asegúrate de que cada `id` sea único en el módulo
3. Verifica que el `initialCode` sea código Python válido

¡Listo! Ahora tienes el control total sobre los ejercicios de tu curso. 🎉
