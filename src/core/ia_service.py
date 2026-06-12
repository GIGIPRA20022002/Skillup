import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

def armar_prompt_maestro(errores, codigo_estudiante):
    
    lista_errores = ", ".join(errores)
    
    prompt = f"""
    Actúa como un profesor universitario de programación, empático pero estricto.
    El estudiante escribio este código en Python:
    
    {codigo_estudiante}

    Mi sistema automático detectó que el estudiante cometió estas malas prácticas: {lista_errores}.
    
    Tu tarea: Escribe un mensaje corto (máximo 2 párrafos) saludando al estudiante, 
    explicando por qué esos errores son malas prácticas en la industria del software, 
    y dándole una pista para mejorar. NUNCA le des el código resuelto.
    """
    return prompt


def generar_feedback_ia(diagnostico, codigo_estudiante):
    
    # 1. Filtramos los errores que el modelo de Machine Learning detectó en el código del estudiante.
    errores_encontrados = [llave for llave, valor in diagnostico.items() if valor == 1]
    
    # 2. Si el código es perfecto, no gastamos dinero en la IA, respondemos nosotros:
    if not errores_encontrados:
        return "¡Excelente trabajo, ingeniero! tu codigo está muy limpio y sigue todas las buenas practicas de la industria."
    
    # 3. Si hay errores, armamos el prompt maestro
    prompt = armar_prompt_maestro(errores_encontrados, codigo_estudiante)
    
    # 4. EL INTERRUPTOR UNIVERSAL
    # Agregamos .strip() para destruir cualquier espacio en blanco accidental
    PROVEEDOR_IA = os.getenv("PROVEEDOR_IA", "mock").strip().lower()
    
    # EL CHISMOSO: Esto imprimirá en la consola de Render exactamente lo que Python está viendo
    print(f"🚨 DEBUG - Python está leyendo el interruptor como: '{PROVEEDOR_IA}'")
    
    if PROVEEDOR_IA == "openai":
        # Aquí irá el código de OpenAI (ChatGPT) cuando tengas la API Key
        pass
        
    elif PROVEEDOR_IA == "gemini":
        # 1. Traer la llave secreta desde el entorno seguro (.env o Render)
        api_key = os.getenv("API_KEY_SECRETA")
        if not api_key:
            return "🚨 Error del Servidor: No se encontró la API Key secreta de Google."
        
        try:
            # 2. Configurar la conexión con Google
            genai.configure(api_key=api_key)
            
            # 3. Llamar al modelo (Gemini 1.5 Flash es ultrarrápido)
            modelo = genai.GenerativeModel('gemini-1.5-flash')
            respuesta = modelo.generate_content(prompt)
            
            return respuesta.text
            
        except Exception as e:
            # Protegemos el backend por si Google se cae o la llave es inválida
            return f"🚨 Error conectando con Gemini: {str(e)}"
            
    else:
        # EL MOCK: Mientras el decano decide, devolvemos un texto simulando a la IA
        respuesta_simulada = (
            f"🤖 [MODO SIMULACIÓN]\n\n"
            f"¡Hola! He revisado tu código. Noté que cometiste algunas prácticas que debemos corregir, "
            f"específicamente relacionadas con: **{', '.join(errores_encontrados)}**.\n\n"
            f"Cuando cambies el interruptor a Gemini, aquí aparecerá una explicación detallada."
        )
        return respuesta_simulada