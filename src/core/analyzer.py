import ast

def analizar_codigo(arbol):
    caracteristicas = {"posible_ciclo_infinito": 0, "variable_control": 0}
    
    for nodo in ast.walk(arbol):
        if isinstance(nodo, ast.While): 
            caracteristicas["posible_ciclo_infinito"] = 1 
            
            if isinstance(nodo.test, ast.Compare) and isinstance(nodo.test.left, ast.Name):
                sospechoso = nodo.test.left.id
                
                for instruccion in nodo.body:
                    # Chequeo de asignación (x = x + 1)
                    if isinstance(instruccion, ast.Assign):
                        if isinstance(instruccion.targets[0], ast.Name) and instruccion.targets[0].id == sospechoso:
                            caracteristicas["variable_control"] = 1
                    
                    # Chequeo de incremento (x += 1)
                    if isinstance(instruccion, ast.AugAssign):
                        if isinstance(instruccion.target, ast.Name) and instruccion.target.id == sospechoso:
                            caracteristicas["variable_control"] = 1
    

    if caracteristicas["variable_control"] == 1:
        caracteristicas["posible_ciclo_infinito"] = 0

    return caracteristicas