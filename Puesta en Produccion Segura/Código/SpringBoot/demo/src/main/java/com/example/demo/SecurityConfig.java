package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity // Habilita la seguridad a nivel web
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Deshabilita la protección CSRF 
            //    (necesario para APIs REST sin sesiones basadas en cookies)
            .csrf(csrf -> csrf.disable()) 
            
            // 2. Configura las reglas de autorización para los endpoints
            .authorizeHttpRequests(authorize -> authorize
                // Permite a CUALQUIERA acceder al endpoint de login
                .requestMatchers("/api/auth/login").permitAll() 
                // Todas las demás peticiones deben estar AUTENTICADAS
                .anyRequest().authenticated()
            );

            return http.build();
    }
}