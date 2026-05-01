class Producto {
  final int id;
  final String nombre;
  final double precio;
  final double precioFinal;
  final bool descuentoAplicado;
  final String? descripcion;

  const Producto({
    required this.id,
    required this.nombre,
    required this.precio,
    required this.precioFinal,
    required this.descuentoAplicado,
    this.descripcion,
  });

  factory Producto.fromJson(Map<String, dynamic> json) {
    final precio = (json['precio'] as num).toDouble();
    return Producto(
      id: json['id'] as int,
      nombre: json['nombre'] as String,
      precio: precio,
      precioFinal: (json['precio_final'] as num?)?.toDouble() ?? precio,
      descuentoAplicado: json['descuento_abac_aplicado'] as bool? ?? false,
      descripcion: json['descripcion'] as String?,
    );
  }
}
