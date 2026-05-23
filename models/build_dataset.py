import ast
import os
import pandas as pd
from src.core.analyzer import analizar_codigo

dataset_crudo = []

archivos_folder = os.listdir("dataset/ciclos")

for archivo in archivos_folder :
    ruta_completa = f"dataset/ciclos/{archivo}"
    with open (ruta_completa , "r" , encoding= "utf-8") as archivo_fisico:
        codigo_texto = archivo_fisico.read()
    try:
        tree = ast.parse(codigo_texto)
        resultado = analizar_codigo(tree)
        dataset_crudo.append(resultado)
    except SyntaxError as e:
        print(f"Error de sintaxis: {e}")

df = pd.DataFrame(dataset_crudo)
df.to_csv("dataset.csv",index = False)
print ("Dataset creado y convertido a dataset.csv")

