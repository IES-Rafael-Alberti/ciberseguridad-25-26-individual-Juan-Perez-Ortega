package com.example.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin; 

import java.util.Collections;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth") // Ruta base: /api/auth
public class AuthController {

    // Clase interna simple para modelar la entrada JSON (usuario/contraseña)
    public static class LoginRequest {
        public String username;
        public String password;
    }

    // Endpoint de login
    @PostMapping("/login") // POST a /api/auth/login
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        
        // ** LÓGICA DE AUTENTICACIÓN SIMULADA **
        // Verifica si las credenciales son las predefinidas (user/pass)
        if ("user".equals(request.username) && "pass".equals(request.password)) {
            
            // Si son válidas, genera un token simple de prueba
            String token = "TOKEN-SIMULADO-" + request.username + "-EXITO";
            
            // Devuelve el token con código de respuesta 200 OK
            return ResponseEntity.ok(Collections.singletonMap("token", token));
        } else {
            // Credenciales inválidas, devuelve código 401 Unauthorized
            return ResponseEntity.status(401).body(Collections.singletonMap("error", "Credenciales inválidas"));
        }
    }
}