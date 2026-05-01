// MASVS-NETWORK-1: URL base siempre HTTPS. Nunca HTTP en producción.
// MASVS-CODE-1: No hay credenciales ni secretos hardcodeados aquí.
class ApiConfig {
  static const String baseUrl = 'https://clinica-veterinaria-rxnp.onrender.com';

  static const String register = '/register';
  static const String token = '/token';
  static const String mascotas = '/mascotas';
  static const String productos  = '/tienda/productos';
  static const String adopciones = '/adopciones';
  static const String descuento  = '/tienda/productos';

  static const Duration connectTimeout = Duration(seconds: 10);
  static const Duration receiveTimeout = Duration(seconds: 15);
}
