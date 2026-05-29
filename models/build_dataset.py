import ast
import os
import pandas as pd
from src.core.analyzer import analizar_codigo

dataset_crudo = []

carpetas = ["ciclos","condicionales"]

for carpeta in carpetas:
    archivos_folder = os.listdir(f"dataset/{carpeta}")
    for archivo in archivos_folder:
        ruta_completa = f"dataset/{carpeta}/{archivo}"
        with open (ruta_completa , "r" , encoding= "utf-8") as archivo_fisico:
            codigo_texto = archivo_fisico.read()
        try:
            tree = ast.parse(codigo_texto)
            resultado = analizar_codigo(tree)
            
            resultado["es_infinito"] = 0
            resultado["es_error_condicional"] = 0

            if "malo" in archivo:
                if carpeta == "ciclos":
                    resultado["es_infinito"] = 1
                elif carpeta == "condicionales":
                    resultado["es_error_condicional"] = 1

            dataset_crudo.append(resultado)
        except SyntaxError as e:
            print(f"Error de sintaxis: {e}")

df = pd.DataFrame(dataset_crudo)
df.to_csv("dataset.csv",index = False)
print ("Dataset creado y convertido a dataset.csv")

