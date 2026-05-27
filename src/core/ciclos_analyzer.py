import ast

def analizar_while(nodo):
    """
    Este es el experto. Solo se encarga de revisar un nodo ast.While
    y extraer sus características específicas.
    """
    # Si el orquestador nos mandó este nodo, es porque encontramos un While
    datos_ciclo = {
        "posible_ciclo_infinito": 1,
        "variable_control": 0,
        "es_while_true" : 0,
        "tiene_break" : 0,
        "es_ciclo_vacio" : 0,
        "incrementa_otra_variable": 0,
        "resetea_variable": 0
    }
    
    ##LOGICA PARA DETECTAR VARIABLE DE CONTROL##
    if isinstance(nodo.test, ast.Compare) and isinstance(nodo.test.left, ast.Name):
        sospechoso = nodo.test.left.id
        
        for instruccion in nodo.body:
            if isinstance(instruccion, ast.Assign):
                if isinstance(instruccion.targets[0], ast.Name) and instruccion.targets[0].id == sospechoso:
                
                    if isinstance(instruccion.value, ast.Constant):
                        datos_ciclo["resetea_variable"] = 1
                    else:
                        datos_ciclo["variable_control"] = 1
            else:
                datos_ciclo["incrementa_otra_variable"] = 1
            
            # Chequeo de incremento (x += 1)
            if isinstance(instruccion, ast.AugAssign):
                if isinstance(instruccion.target, ast.Name) and instruccion.target.id == sospechoso:
                    datos_ciclo["variable_control"] = 1
                else: 
                    datos_ciclo["incrementa_otra_variable"] = 1
                    
    


    ##LOGICA DE DETECTAR CICLO INFINITO##

    if isinstance(nodo.test,ast.Constant) and nodo.test.value is True :
        datos_ciclo["es_while_true"] = 1

    for item in ast.walk(nodo) :
        if isinstance(item,ast.Break) :
            datos_ciclo["tiene_break"] = 1


    ##LOGICA PARA DETECTAR CICLO VACIOS##
    if (len(nodo.body)== 1 and  isinstance (nodo.body[0],ast.Pass )):
        datos_ciclo ["es_ciclo_vacio"] = 1



    return datos_ciclo




