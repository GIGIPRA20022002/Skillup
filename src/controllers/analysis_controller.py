import ast 
from src.core.analyzer import analizar_codigo

def procesar_peticion(codigo_texto):
    try:
        arbol = ast.parse(codigo_texto)
        resultado = analizar_codigo(arbol)
        return {
            "estado" : "exito" ,
            "datos"  : resultado
        }
    except SyntaxError as e :
        return {"error" : f"Ocurrio un error inesperado {e}"}
    

