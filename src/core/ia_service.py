import os
from dotenv import load_dotenv

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
    # Aquí defines qué IA vas a usar. Puede venir de un archivo .env en el futuro.
    PROVEEDOR_IA = "mock" # Opciones futuras: "openai", "gemini", "claude"
    
    if PROVEEDOR_IA == "openai":
        # Aquí irá el código de OpenAI (ChatGPT) cuando tengas la API Key
        # respuesta = llamar_api_openai(prompt)
        # return respuesta
        pass
        
    elif PROVEEDOR_IA == "gemini":
        # Aquí irá el código de Google Gemini cuando tengas la API Key
        # respuesta = llamar_api_gemini(prompt)
        # return respuesta
        pass
        
    else:
        # EL MOCK: Mientras el decano decide, devolvemos un texto simulando a la IA
        # pero ya usando la lista REAL de errores que detectó tu modelo de Machine Learning.
        respuesta_simulada = (
            f"🤖 [MODO SIMULACIÓN: Esperando API Key]\n\n"
            f"¡Hola! He revisado tu código. Noté que cometiste algunas prácticas que debemos corregir, "
            f"específicamente relacionadas con: **{', '.join(errores_encontrados)}**.\n\n"
            f"Cuando el decano autorice la API, aquí aparecerá una explicación detallada de por qué "
            f"estas son malas prácticas y cómo mejorarlas."
        )
        return respuesta_simulada