import ast 

def analizar_if (nodo) : 


    datos_if = {
        "tiene_condicional" : 1,
        "condicion_redundante": 0 ,
        "if_vacio" : 0,
        "comparacion_booleana":0
    }

#LOGICA PARA DETECTAR CONDICIONALES REDUNDANTES#
# Si la condición es una constante booleana (True o False), se considera redundante.
    if isinstance (nodo.test,ast.Constant) :
        if isinstance(nodo.test.value,bool):
            datos_if["condicion_redundante"] = 1
# Si la condición es una comparación entre dos variables o entre una variable y una constante, se considera redundante si ambas partes son iguales.
    if isinstance(nodo.test,ast.Compare):
        izquierda = nodo.test.left
        derecha = nodo.test.comparators[0]

        if isinstance(izquierda,ast.Name) and isinstance(derecha,ast.Name):
            if izquierda.id == derecha.id :
                datos_if["condicion_redundante"] = 1

#LOGICA PARA DETECTAR IF VACIOS#
    if (len(nodo.body) == 1 and isinstance(nodo.body[0],ast.Pass)):
        datos_if["if_vacio"] = 1


#LOGICA PARA DETECTAR COMPARACIONES BOOLEANAS#
# Si la condición es una comparación entre una variable y una constante booleana, se considera una comparación booleana.

    if isinstance(nodo.test,ast.Compare):
        izquierda1 = nodo.test.left
        derecha1 = nodo.test.comparators[0]
        
        caso_1 = isinstance(izquierda1,ast.Name) and isinstance(derecha1,ast.Constant) and isinstance(derecha1.value,bool)
        caso_2 = isinstance(derecha1,ast.Constant) and isinstance(derecha1.value,bool) and isinstance(izquierda1,ast.Name)
        if caso_1 or caso_2:
            datos_if["comparacion_booleana"] = 1

    return datos_if