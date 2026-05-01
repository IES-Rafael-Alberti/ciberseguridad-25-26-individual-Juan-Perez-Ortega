import 'package:flutter/foundation.dart';
import 'api_service.dart';
import '../utils/secure_storage.dart';

// MASVS-AUTH: gestión centralizada del ciclo de vida de la sesión.
class AuthService extends ChangeNotifier {
  final _api = ApiService();
  bool _isAuthenticated = false;
  String? _email;
  String? _role;

  bool get isAuthenticated => _isAuthenticated;
  String? get email => _email;
  String? get role  => _role;

  AuthService() {
    _restoreSession();
  }

  // Al arrancar la app, recupera sesión del almacenamiento seguro si existe.
  Future<void> _restoreSession() async {
    final token = await SecureStorageService.getToken();
    if (token != null) {
      _email = await SecureStorageService.getEmail();
      _role  = await SecureStorageService.getRole();
      _isAuthenticated = true;
      notifyListeners();
    }
  }

  Future<void> login(String email, String password) async {
    final token = await _api.login(email, password);
    await SecureStorageService.saveToken(token);
    await SecureStorageService.saveUserInfo(email, 'clientela');
    _email = email;
    _role  = 'clientela';
    _isAuthenticated = true;
    notifyListeners();
  }

  Future<void> register(String email, String password) async {
    await _api.register(email, password);
    await login(email, password);
  }

  // MASVS-AUTH: logout borra todos los datos sensibles del dispositivo.
  Future<void> logout() async {
    await SecureStorageService.clear();
    _isAuthenticated = false;
    _email = null;
    _role  = null;
    notifyListeners();
  }
}
