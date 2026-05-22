import ast
from src.core.analyzer import analizar_codigo

# Simulamos algunos códigos (luego los leerás directamente de los archivos .py)
codigo_prueba = "contador = 0\nwhile contador < 5:\n    print('Hola')"
codigo_estudiantes = [codigo_prueba] 

dataset_crudo = []

for codigo in codigo_estudiantes:
    try:
        tree = ast.parse(codigo)
        resultado = analizar_codigo(tree)
        dataset_crudo.append(resultado)
    except SyntaxError as e:
        print(f"Error de sintaxis: {e}")

print("Dataset procesado:", dataset_crudo)