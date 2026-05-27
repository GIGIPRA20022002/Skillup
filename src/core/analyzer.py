import ast
import joblib
# Importamos a nuestro experto en ciclos
from src.core.ciclos_analyzer import analizar_while

def analizar_codigo(arbol):
    # Características por defecto si el código no tiene nada
    caracteristicas = {"posible_ciclo_infinito": 0, "variable_control": 0}
    
    # El Orquestador solo recorre el árbol buscando estructuras
    for nodo in ast.walk(arbol):
        if isinstance(nodo, ast.While): 
            datos_ciclo = analizar_while(nodo)
            caracteristicas.update(datos_ciclo)
    

    
    modelo_ia = joblib.load("models/modelo_ciclos.pkl")
    
    pistas_ia = [[
    caracteristicas.get("posible_ciclo_infinito", 0), 
    caracteristicas.get("variable_control", 0),
    caracteristicas.get("es_while_true", 0),
    caracteristicas.get("tiene_break", 0),
    caracteristicas.get("es_ciclo_vacio", 0),
    caracteristicas.get("incrementa_otra_variable", 0),
    caracteristicas.get("resetea_variable", 0)
    ]]
    
    prediccion = modelo_ia.predict(pistas_ia)
    caracteristicas["diagnostico_ia_infinito"] = int(prediccion[0])

    return caracteristicas