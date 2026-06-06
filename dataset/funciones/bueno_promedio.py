def calcular_promedio(numeros):
    if not numeros:
        return 0
    return sum(numeros) / len(numeros)