def calcular_descuento(precio, porcentaje):
    descuento = precio * (porcentaje / 100)
    print(f"El descuento aplicado es: {descuento}")
    precio_final = precio - descuento
    return precio_final