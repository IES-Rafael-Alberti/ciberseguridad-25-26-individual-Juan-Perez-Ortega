package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// La interfaz extiende JpaRepository, indicando la Entidad (Producto) 
// y el tipo de dato de su ID (Long).
@Repository 
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // Todos los métodos CRUD (save, findById, findAll, delete, etc.)
    // están ahora disponibles automáticamente. No necesitamos añadir código aquí.
}