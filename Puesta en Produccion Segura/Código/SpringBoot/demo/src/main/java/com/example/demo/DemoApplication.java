package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping; // <-- IMPORTANTE
import org.springframework.web.bind.annotation.RestController; // <-- IMPORTANTE

@SpringBootApplication
@RestController // Añade esta anotación aquí
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    // Añade este método para crear la ruta /
    @GetMapping("/") 
    public String hello() {
        return "¡Hola! Tu aplicación Spring Boot está funcionando en Docker.";
    }
}
