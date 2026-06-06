def calcular_total(nombre, cantidad, precio_unitario, impuesto, descuento):
    subtotal = cantidad * precio_unitario
    total_impuesto = subtotal * impuesto
    total_descuento = subtotal * descuento
    total = subtotal + total_impuesto - total_descuento
    
    return {
        "cliente": nombre,
        "total": total
    }