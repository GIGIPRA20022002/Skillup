import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import joblib

print ("Comenzando entrenamiento.....")

df = pd.read_csv("dataset.csv")

X = df[[
    "tiene_condicional",
    "condicion_redundante",
    "if_vacio",
    "comparacion_booleana",
    ]]
y = df[["es_error_condicional"]]

modelo = DecisionTreeClassifier()
modelo.fit(X,y)
joblib.dump(modelo,"models/modelo_condicionales.pkl")
print ("Modelo de condicionales entrenado con exito y guardado en models/modelo_condicionales.pkl!")