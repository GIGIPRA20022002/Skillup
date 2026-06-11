// URL de tu servidor real en la nube
const BASE_URL = 'https://skillup-wj4d.onrender.com';

// 1. Conexión REAL a tu API
export const evaluateCode = async (code, module, studentId) => {
  try {
    const response = await fetch(`${BASE_URL}/analizar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        student_id: studentId,
        module: module,
        code: code
      })
    });

    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`);
    }

    return await response.json();
    
  } catch (error) {
    console.error("🚨 Error conectando con el backend de Render:", error);
    throw error; // Lanza el error para que el frontend muestre una alerta
  }
};

// 2. MOCK: Lo dejamos falso temporalmente hasta que crees un @app.get("/progreso") en Python
export const getProgress = async (studentId) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    unlocked_modules: ["logica", "variables", "funciones"],
    current_module: "ciclos"
  };
};