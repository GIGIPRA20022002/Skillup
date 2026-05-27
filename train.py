import pandas as pd 
from sklearn.tree import DecisionTreeClassifier 
import joblib 

print ("iniciando entrenamiento....")

df = pd.read_csv("dataset.csv")

X = df[["posible_ciclo_infinito",
        "variable_control",
        "es_while_true",
        "tiene_break",
        "es_ciclo_vacio",
        "incrementa_otra_variable",
        "resetea_variable"]]
y = df[["es_infinito"]]

modelo = DecisionTreeClassifier()
modelo.fit(X,y)
joblib.dump(modelo,"models/modelo_ciclos.pkl")
print("modelo entrenado y guardado en la carpeta models")