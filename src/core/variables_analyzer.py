import ast

def analizar_variables(nodo):
    datos_variables = {
        "sobreescribe_builtin": 0,
        "nombre_muy_corto"    : 0,
        "formato_camel_case"  : 0,
        "asignacion_multiple" : 0,
        "uso_global"          : 0,       
    }
    
    1.##Logica para detectar si se sobreescribe un nombre de función o tipo incorporado (builtin)
    conjunto_builtin = {"list", "str", "int", "float", "sum", "max", "min", "dict"}
    if isinstance(nodo, ast.Assign):
        for target in nodo.targets:
            if isinstance(target, ast.Name) and target.id in conjunto_builtin:
                datos_variables["sobreescribe_builtin"] = 1

    2.##NOMBRE DE LA VARIABLE ES MUY CORTO

    if isinstance(nodo, ast.Assign):
        for target in nodo.targets:
            if isinstance(target, ast.Name):
                nombre_var = target.id
                
                
                if len(nombre_var) <= 2:
                    datos_variables["nombre_muy_corto"] = 1
    
    3.##LOGICA PARA DETECTAR ASIGNACION DE VARIAS VARIABLES
    if isinstance(nodo,ast.Assign):
        for target in nodo.targets:
            if isinstance(target,ast.Tuple) and len(target.elts) > 2 :
                datos_variables["asignacion_multiple"] = 1

    
    4.##LOGICA PARA DETECTAR LA VARIABLE GLOBAL(MALA PRACTICA)
    if isinstance(nodo, ast.Global):
        datos_variables["uso_global"] = 1

    5.##LOGICA PARA DETECTAR CAMELCASE Y snake_case

    if isinstance(nodo,ast.Assign):
            for target in nodo.targets:
                if isinstance(target,ast.Name):
                    nombre = target.id
                    mayusculas = sum(1 for c in nombre if c.isupper())
                    if mayusculas >= 1 and "_" not in nombre :
                        datos_variables["formato_camel_case"]= 1

    

    return datos_variables



                    
