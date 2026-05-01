class Mascota {
  final int id;
  final String nombre;
  final String especie;
  final int edad;
  final bool adoptada;

  const Mascota({
    required this.id,
    required this.nombre,
    required this.especie,
    required this.edad,
    required this.adoptada,
  });

  factory Mascota.fromJson(Map<String, dynamic> json) => Mascota(
        id: json['id'] as int,
        nombre: json['nombre'] as String,
        especie: json['especie'] as String,
        edad: json['edad'] as int,
        adoptada: json['adoptada'] as bool? ?? false,
      );
}
