// Conexión REAL al backend de Python
export const evaluateCode = async (code, module, studentId) => {
  try {
    const response = await fetch('https://skillup-wj4d.onrender.com/analizar', {
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Aquí va tu JSON con el "tutor_message"
    
  } catch (error) {
    console.error("Error conectando con el backend:", error);
    throw error;
  }
};

// Función para obtener los ejercicios desde el backend
export const getExercises = async () => {
  try {
    const response = await fetch('https://skillup-wj4d.onrender.com/ejercicios');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error("Error trayendo los ejercicios del backend:", error);
    throw error;
  }
};