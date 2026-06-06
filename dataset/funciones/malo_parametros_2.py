def procesar_pedido(id_pedido, cliente, producto, cantidad, precio, fecha, estado):
    total = cantidad * precio
    return {
        "id": id_pedido,
        "cliente": cliente,
        "producto": producto,
        "total": total,
        "fecha": fecha,
        "estado": estado
    }