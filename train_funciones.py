import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import joblib

print ("Comenzando entrenamiento.....")

df = pd.read_csv("dataset.csv")

X = df[[
    "tiene_funcion",
    "funcion_vacia",
    "codigo_muerto",
    "argumento_mutable",
    "print_sin_return",
    "demasiados_parametros"
]]
y = df[["mal_definido"]]

modelo = DecisionTreeClassifier()
modelo.fit(X,y)
joblib.dump(modelo, "models/modelo_funciones.pkl")
print("Modelo de FUNCIONES entrenado con exito y guardado en models/modelo_funciones.pkl!")