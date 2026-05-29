import ast
import joblib
from src.core.condicionales_analyzer import analizar_if
from src.core.ciclos_analyzer import analizar_while

def analizar_codigo(arbol):
    # Características por defecto si el código no tiene nada
    caracteristicas = {
                        ## LLaves del Analizador del while
                        "posible_ciclo_infinito": 0,
                        "variable_control": 0,
                        "es_while_true" : 0 ,
                        "tiene_break":0 ,
                        "es_ciclo_vacio": 0,
                        "incrementa_otra_variable" :0,
                        "resetea_variable":0,

                        ## LLaves de Analizador del if 
                        "tiene_condicional" : 0,
                        "condicion_redundante" :0,
                        "if_vacio" : 0,
                        "comparacion_booleana" :0,
                        }
    
    # El Orquestador solo recorre el árbol buscando estructuras
    for nodo in ast.walk(arbol):
        if isinstance(nodo, ast.While): 
            datos_ciclo = analizar_while(nodo)
            caracteristicas.update(datos_ciclo)
        elif isinstance(nodo,ast.If):
            datos_if = analizar_if(nodo)
            caracteristicas.update(datos_if)
            
    

    try:
        modelo_ciclos = joblib.load("models/modelo_ciclos.pkl")
        modelo_condicionales = joblib.load("models/modelo_condicionales.pkl")

       
        pistas_ciclos = [[
            caracteristicas.get("posible_ciclo_infinito", 0), 
            caracteristicas.get("variable_control", 0),
            caracteristicas.get("es_while_true", 0),
            caracteristicas.get("tiene_break", 0),
            caracteristicas.get("es_ciclo_vacio", 0),
            caracteristicas.get("incrementa_otra_variable", 0),
            caracteristicas.get("resetea_variable", 0)
        ]]

        pistas_condicionales = [[
        caracteristicas.get("tiene_condicional", 0),
        caracteristicas.get("condicion_redundante", 0),
        caracteristicas.get("if_vacio", 0),
        caracteristicas.get("comparacion_booleana", 0),
        ]]
        

        prediccion_ciclos = modelo_ciclos.predict(pistas_ciclos)
        caracteristicas["diagnostico_ia_infinito"] = int(prediccion_ciclos[0])

        prediccion_condicionales = modelo_condicionales.predict(pistas_condicionales)
        caracteristicas["diagnostico_ia_condicional"] = int(prediccion_condicionales[0])
    except Exception as e:
        print(f"Error al cargar los modelos .Error : {e}")
        caracteristicas["diagnostico_ia_infinito"] = 0
        caracteristicas["diagnostico_ia_condicional"] = 0
    
    return caracteristicas