import 'dart:io';
import 'package:dio/dio.dart';
import 'package:dio/io.dart';
import 'package:flutter/foundation.dart';
import '../config/api_config.dart';
import '../utils/secure_storage.dart';

// MASVS-NETWORK-1: cliente centralizado — toda comunicación pasa por aquí,
// siempre sobre HTTPS (definido en ApiConfig.baseUrl).
// MASVS-NETWORK-2: para certificate pinning en producción añadir un
// BadCertificateCallback con el hash SHA-256 del certificado del servidor.
class ApiService {
  late final Dio _dio;

  ApiService() {
    _dio = Dio(
      BaseOptions(
        baseUrl: ApiConfig.baseUrl,
        connectTimeout: ApiConfig.connectTimeout,
        receiveTimeout: ApiConfig.receiveTimeout,
        headers: {'Content-Type': 'application/json'},
      ),
    );

    // Solo en debug: redirige tráfico a ZAP (10.0.2.2:8090) para análisis DAST.
    // En release este bloque no compila (kDebugMode = false).
    if (kDebugMode) {
      (_dio.httpClientAdapter as IOHttpClientAdapter).createHttpClient = () {
        final client = HttpClient();
        client.findProxy = (uri) => 'PROXY 10.0.2.2:8090';
        client.badCertificateCallback = (cert, host, port) => true;
        return client;
      };
    }

    // Interceptor: adjunta Bearer token y limpia sesión si expira (401).
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          final token = await SecureStorageService.getToken();
          if (token != null) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          handler.next(options);
        },
        onError: (error, handler) {
          // MASVS-STORAGE-2: no loguear cuerpos de respuesta con datos sensibles.
          if (error.response?.statusCode == 401) {
            SecureStorageService.clear();
          }
          handler.next(error);
        },
      ),
    );
  }

  // OAuth2 Password flow — requiere form-encoded, no JSON.
  Future<String> login(String email, String password) async {
    final response = await _dio.post(
      ApiConfig.token,
      data: {'username': email, 'password': password},
      options: Options(contentType: 'application/x-www-form-urlencoded'),
    );
    return response.data['access_token'] as String;
  }

  Future<void> register(String email, String password) async {
    await _dio.post(
      ApiConfig.register,
      data: {'email': email, 'password': password, 'role': 'clientela'},
    );
  }

  Future<List<dynamic>> getMascotas() async {
    final response = await _dio.get(ApiConfig.mascotas);
    return response.data as List<dynamic>;
  }

  Future<List<dynamic>> getProductos() async {
    final response = await _dio.get(ApiConfig.productos);
    return response.data as List<dynamic>;
  }

  Future<Map<String, dynamic>> adoptarMascota(int mascotaId) async {
    final response = await _dio.post(
      ApiConfig.adopciones,
      queryParameters: {'mascota_id': mascotaId},
    );
    return response.data as Map<String, dynamic>;
  }

  Future<Map<String, dynamic>> getDescuento(int productoId) async {
    final response = await _dio.get('${ApiConfig.descuento}/$productoId');
    return response.data as Map<String, dynamic>;
  }
}
