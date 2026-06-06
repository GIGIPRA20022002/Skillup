import ast
import joblib
from src.core.condicionales_analyzer import analizar_if
from src.core.ciclos_analyzer import analizar_while
from src.core.variables_analyzer import analizar_variables
from src.core.funciones_analyzer import analizar_funciones

def analizar_codigo(arbol):
    caracteristicas = {
        ## LLaves del Analizador del while
        "posible_ciclo_infinito": 0,
        "variable_control": 0,
        "es_while_true" : 0 ,
        "tiene_break":0 ,
        "es_ciclo_vacio": 0,
        "incrementa_otra_variable" :0,
        "resetea_variable":0,

        ## LLaves del Analizador del if 
        "tiene_condicional" : 0,
        "condicion_redundante" :0,
        "if_vacio" : 0,
        "comparacion_booleana" :0,
        
        ## 2. LLaves del Analizador de Funciones (NUEVO)
        "tiene_funcion": 0,
        "funcion_vacia": 0,
        "codigo_muerto": 0,
        "argumento_mutable": 0,
        "print_sin_return": 0,
        "demasiados_parametros": 0,

        "sobreescribe_builtin": 0,
        "nombre_muy_corto"    : 0,
        "formato_camel_case"  : 0,
        "asignacion_multiple" : 0,
        "uso_global"          : 0,

    }
    
    # El Orquestador recorre el árbol buscando las 3 estructuras
    for nodo in ast.walk(arbol):
        if isinstance(nodo, ast.While): 
            datos_ciclo = analizar_while(nodo)
            caracteristicas.update(datos_ciclo)
        elif isinstance(nodo, ast.If):
            datos_if = analizar_if(nodo)
            caracteristicas.update(datos_if)
        # 3. Le damos trabajo al experto en funciones
        elif isinstance(nodo, ast.FunctionDef):
            datos_funcion = analizar_funciones(nodo)
            caracteristicas.update(datos_funcion)
        elif isinstance(nodo, (ast.Assign, ast.Global)):
            datos_variables = analizar_variables(nodo)
            
            for llave, valor in datos_variables.items():
                if valor == 1:
                    caracteristicas[llave] = 1

   
    try:
        # Cargamos a los tres especialistas a la memoria RAM
        modelo_ciclos = joblib.load("models/modelo_ciclos.pkl")
        modelo_condicionales = joblib.load("models/modelo_condicionales.pkl")
        modelo_funciones = joblib.load("models/modelo_funciones.pkl")
        modelo_variables = joblib.load("models/modelo_variables.pkl")
        
        # Bandeja Ciclos: Espera exactamente las 7 pistas con las que entrenó
        pistas_ciclos = [[
            caracteristicas.get("posible_ciclo_infinito", 0), 
            caracteristicas.get("variable_control", 0),
            caracteristicas.get("es_while_true", 0),
            caracteristicas.get("tiene_break", 0),
            caracteristicas.get("es_ciclo_vacio", 0),
            caracteristicas.get("incrementa_otra_variable", 0),
            caracteristicas.get("resetea_variable", 0)
        ]]
        
        # Bandeja Condicionales: Espera exactamente sus 4 pistas
        pistas_condicionales = [[
            caracteristicas.get("tiene_condicional", 0),
            caracteristicas.get("condicion_redundante", 0),
            caracteristicas.get("if_vacio", 0),
            caracteristicas.get("comparacion_booleana", 0)
        ]]
        
        # Bandeja Funciones: Espera exactamente sus 4 pistas (¡NUEVO!)
        pistas_funciones = [[
            caracteristicas.get("tiene_funcion", 0),
            caracteristicas.get("funcion_vacia", 0),
            caracteristicas.get("codigo_muerto", 0),
            caracteristicas.get("argumento_mutable", 0),
            caracteristicas.get("print_sin_return", 0),
            caracteristicas.get("demasiados_parametros", 0)
        ]]
        pistas_variables = [[
            caracteristicas.get("sobreescribe_builtin", 0),
            caracteristicas.get("nombre_muy_corto", 0),
            caracteristicas.get("formato_camel_case", 0),
            caracteristicas.get("asignacion_multiple", 0),
            caracteristicas.get("uso_global", 0),
        ]]
        
        prediccion_ciclos = modelo_ciclos.predict(pistas_ciclos)
        prediccion_condicionales = modelo_condicionales.predict(pistas_condicionales)
        prediccion_funciones = modelo_funciones.predict(pistas_funciones)
        prediccion_variables = modelo_variables.predict(pistas_variables)
        
        # Guardamos los diagnósticos finales en el reporte que viaja a la API
        caracteristicas["diagnostico_ia_infinito"] = int(prediccion_ciclos[0])
        caracteristicas["diagnostico_ia_condicional"] = int(prediccion_condicionales[0])
        caracteristicas["diagnostico_ia_funciones"] = int(prediccion_funciones[0])
        caracteristicas["diagnostico_ia_variables"] = int(prediccion_variables[0])
        
        
    except Exception as e:
        # Programación Defensiva: Si algo falla cargando los .pkl, la API sigue viva en 0
        print(f"Alerta en Orquestador: No se pudieron cargar los modelos IA. Error: {e}")
        caracteristicas["diagnostico_ia_infinito"] = 0
        caracteristicas["diagnostico_ia_condicional"] = 0
        caracteristicas["diagnostico_ia_funciones"] = 0
        caracteristicas["diagnostico_ia_variables"] = 0

    return caracteristicas