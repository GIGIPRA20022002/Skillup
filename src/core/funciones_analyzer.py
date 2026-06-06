import ast

def analizar_funciones(nodo):

    datos_funcion ={ 
        "tiene_funcion" : 1,
        "funcion_vacia" : 0,
        "codigo_muerto" : 0,
        "argumento_mutable":0,
        "print_sin_return":0,
        "demasiados_parametros":0
    }

    1.##LOIGICA PARA FUNCION VACIA
    if isinstance(nodo, ast.FunctionDef):
        if len(nodo.body) == 1 and isinstance(nodo.body[0], ast.Pass):
            datos_funcion["funcion_vacia"] = 1
    
    2.##LOGICA PARA ALGO DESPUES DEL RETURN
    for posicion, instruccion in enumerate(nodo.body):
        if isinstance(instruccion, ast.Return) and posicion < len(nodo.body) - 1:
            datos_funcion["codigo_muerto"] = 1
            break
    
    3.##LOGICA PARA ARGUMENTO MUTABLE
    for args in nodo.args.defaults :
        if isinstance(args,(ast.List,ast.Dict)):
            datos_funcion["argumento_mutable"] = 1
            break
    
    4. ##LOGICA PARA PRINT SIN RETURN
    tiene_print = False
    tiene_return = False

    for instruccion in nodo.body:
        if isinstance(instruccion,ast.Return):
            tiene_return = True
        elif  isinstance (instruccion,ast.Expr) and isinstance(instruccion.value,ast.Call):
            if isinstance (instruccion.value.func,ast.Name) and instruccion.value.func.id == "print" : 
                tiene_print = True
    
    if tiene_print and not tiene_return:
        datos_funcion["print_sin_return"] = 1 

    5.##LOGICA PARA VER SI LA DEFINICION CONTIENE DEMASIADOS ATRIBUTOS
    if  len(nodo.args.args)>5 :
        datos_funcion["demasiados_parametros"] = 1
    


    return datos_funcion