import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import joblib

print ("Comenzando entrenamiento.....")

df = pd.read_csv("dataset.csv")

X = df[[
    "sobreescribe_builtin",
    "nombre_muy_corto",
    "formato_camel_case",
    "asignacion_multiple",
    "uso_global",
    ]]
y = df[["practica_incorrecta"]]

modelo = DecisionTreeClassifier()
modelo.fit(X,y)
joblib.dump(modelo,"models/modelo_variables.pkl")
print ("Modelo de variables entrenado con exito y guardado en models/modelo_variables.pkl!")