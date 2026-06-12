# 🚀 SkillUP - Plataforma de Aprendizaje de Python

Bienvenido a SkillUP, una plataforma interactiva para aprender Python paso a paso.

---

## 🌐 Enlaces en Vivo (Producción)

¡El proyecto ya está desplegado en la nube y listo para usarse!

* **🎮 Frontend (Aplicación para estudiantes):(https://skillup-snowy.vercel.app/)
* **⚙️ Backend (API de Python en Render):** https://skillup-wj4d.onrender.com

---

## 🎯 ¿Qué es esto?

Una **plataforma educativa** donde los estudiantes aprenden Python completando ejercicios organizados en 4 módulos:

1. **Funciones** - Crear y usar funciones
2. **Variables** - Declarar y usar variables
3. **Ciclos** - for y while
4. **Condicionales** - if, elif, else

Los módulos se **desbloquean progresivamente** al completar ejercicios.

---

## ⚡ Instalación Local (Para Desarrolladores)

Si deseas descargar el código y modificarlo en tu computadora local:

### Iniciar Backend
```bash
cd SkillUP
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload
El Backend local correrá en: http://localhost:8000

Iniciar Frontend
Bash
cd frontend/Front
npm install
npm run dev
El Frontend local correrá en: http://localhost:5173

📝 Para Profesores: Agregar Ejercicios
✅ Es muy fácil - NO necesitas programar

Lee: GUÍA_PROFESORES.md

En resumen:

Abre frontend/Front/src/data/exercises.js

Agrega tu ejercicio a cualquier módulo

¡Listo! Los estudiantes lo ven automáticamente

📁 Estructura del Proyecto
Plaintext
SkillUP/
├── main.py                          # Backend FastAPI
├── src/                             # Código del backend
│   ├── controllers/                 # Controladores de análisis
│   └── core/                        # Servicios de IA y análisis
├── frontend/Front/                  # React + Vite
│   ├── src/
│   │   ├── components/              # Componentes React
│   │   ├── hooks/                   # Lógica del progreso
│   │   ├── services/                # API calls
│   │   └── data/exercises.js        # ✏️ EDITAR AQUÍ PARA AGREGAR EJERCICIOS
│   └── package.json
├── ejercicios-estructura.json       # Template de estructura
├── GUÍA_PROFESORES.md              # Instrucciones detalladas
└── requirements.txt                 # Dependencias Python
🔧 Características
✅ Editor de código integrado (Monaco Editor)

✅ Análisis automático de código (ML + AST)

✅ Feedback inteligente con IA (Google Gemini)

✅ Chat con tutor virtual ✅ Progreso persistente (localStorage)

✅ Desbloqueo progresivo de módulos ---

📚 Módulos y Contenido
Funciones (5 ejercicios)
Función de saludo

Función de área

Calcular total

Nivel de jugador

Promedio de notas

Variables (5 ejercicios)
Intercambio de variables

Calculadora de promedio

Inventario de tienda

Sistema de cuenta bancaria

Perfil de jugador

Ciclos (5 ejercicios)
Tabla de multiplicar

Cuenta regresiva

Conteo de monedas

Recorrer inventario

Experiencia de jugador

Condicionales (5 ejercicios)
Clasificación de edad

Calculadora de IMC

Validación de edad

Sistema de descuentos

Estado del jugador

🎓 Flujo de Uso
Estudiante entra a la plataforma

Ve el mapa de niveles (módulos)

Elige un ejercicio desbloqueado

Escribe código en el editor

Envía código → Backend analiza

Recibe feedback del tutor IA

Si es correcto → ✅ Ejercicio completado

Si es incorrecto → ❌ Ve qué falló + sugerencias

Completa todos los ejercicios del módulo → Siguiente módulo se desbloquea

🤖 Sistema de Evaluación
El backend:

Valida sintaxis - ¿Es Python válido?

Analiza patrones - Usa modelos ML entrenados

Genera feedback - Con Google Gemini API

Muestra al estudiante - Chat con el tutor

📝 Variables de Entorno
Crear archivo .env en la raíz (solo para desarrollo local):

Fragmento de código
PROVEEDOR_IA=gemini
API_KEY_SECRETA=tu_gemini_api_key
🛠️ Tecnologías
Backend:

FastAPI (Python)

ML: scikit-learn, joblib

IA: Google Gemini 1.5 Flash / 2.0 Flash

Frontend:

React 19

Vite

Monaco Editor

Axios

📞 Soporte
Para agregar ejercicios: Lee GUÍA_PROFESORES.md

Para problemas técnicos: Contacta al equipo de desarrollo

📄 Licencia
Este proyecto es para uso educativo.