package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController // 1. Indica que es un controlador REST
@RequestMapping("/api/productos") // 2. Define la ruta base para todos los métodos: /api/productos
public class ProductoController {

    @Autowired // 3. Inyecta el repositorio para acceder a los datos
    private ProductoRepository productoRepository;

    // A. CREAR (C: Create)
    // Método: POST a /api/productos
    @PostMapping 
    public Producto crearProducto(@RequestBody Producto producto) {
        return productoRepository.save(producto);
    }

    // B. LEER Todos (R: Read)
    // Método: GET a /api/productos
    @GetMapping 
    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }

    // C. LEER por ID (R: Read)
    // Método: GET a /api/productos/{id}
    @GetMapping("/{id}") 
    public Producto obtenerPorId(@PathVariable Long id) {
        // Busca por ID, si no existe, devuelve null
        return productoRepository.findById(id).orElse(null);
    }

    // D. ACTUALIZAR (U: Update)
    // Método: PUT a /api/productos/{id}
    @PutMapping("/{id}") 
    public Producto actualizarProducto(@PathVariable Long id, @RequestBody Producto productoActualizado) {
        // Verifica si el producto existe
        if (productoRepository.existsById(id)) {
            // Asigna el ID (asegura que se actualiza el registro existente)
            productoActualizado.setId(id);
            return productoRepository.save(productoActualizado);
        }
        return null; 
    }

    // E. BORRAR (D: Delete)
    // Método: DELETE a /api/productos/{id}
    @DeleteMapping("/{id}") 
    public void eliminarProducto(@PathVariable Long id) {
        productoRepository.deleteById(id);
    }
}