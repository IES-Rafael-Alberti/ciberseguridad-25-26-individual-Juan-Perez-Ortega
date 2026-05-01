import 'package:flutter_secure_storage/flutter_secure_storage.dart';

// MASVS-STORAGE-1: tokens guardados en Android Keystore / iOS Keychain.
// Nunca en SharedPreferences, ficheros planos ni logs.
class SecureStorageService {
  static const _storage = FlutterSecureStorage(
    aOptions: AndroidOptions(encryptedSharedPreferences: true),
    iOptions: IOSOptions(accessibility: KeychainAccessibility.first_unlock),
  );

  static const _keyToken = 'access_token';
  static const _keyEmail = 'user_email';
  static const _keyRole  = 'user_role';

  static Future<void> saveToken(String token) =>
      _storage.write(key: _keyToken, value: token);

  static Future<String?> getToken() => _storage.read(key: _keyToken);

  static Future<void> saveUserInfo(String email, String role) async {
    await _storage.write(key: _keyEmail, value: email);
    await _storage.write(key: _keyRole, value: role);
  }

  static Future<String?> getEmail() => _storage.read(key: _keyEmail);
  static Future<String?> getRole()  => _storage.read(key: _keyRole);

  // MASVS-AUTH: al cerrar sesión se borran TODOS los datos sensibles.
  static Future<void> clear() => _storage.deleteAll();
}
