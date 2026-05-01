import 'package:flutter/material.dart';
import '../models/producto.dart';
import '../services/api_service.dart';

class ProductosScreen extends StatefulWidget {
  const ProductosScreen({super.key});

  @override
  State<ProductosScreen> createState() => _ProductosScreenState();
}

class _ProductosScreenState extends State<ProductosScreen> {
  final _api = ApiService();
  late Future<List<Producto>> _future;

  @override
  void initState() {
    super.initState();
    _load();
  }

  void _load() {
    _future = _api.getProductos().then(
          (list) => list
              .map((e) => Producto.fromJson(e as Map<String, dynamic>))
              .toList(),
        );
  }

  void _verPrecio(Producto p) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Precio ABAC'),
        content: p.descuentoAplicado
            ? Text(
                'Precio original: €${p.precio.toStringAsFixed(2)}\n'
                'Precio final:    €${p.precioFinal.toStringAsFixed(2)}\n\n'
                '¡20% de descuento por adopción! 🐾',
              )
            : Text(
                'Precio: €${p.precioFinal.toStringAsFixed(2)}\n\n'
                'Adopta una mascota para obtener un 20% de descuento.',
              ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cerrar'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Producto>>(
      future: _future,
      builder: (context, snap) {
        if (snap.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }
        if (snap.hasError) {
          return Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.error_outline, size: 48),
                const SizedBox(height: 8),
                const Text('Error al cargar productos'),
                const SizedBox(height: 8),
                FilledButton.tonal(
                  onPressed: () => setState(_load),
                  child: const Text('Reintentar'),
                ),
              ],
            ),
          );
        }
        final productos = snap.data!;
        if (productos.isEmpty) {
          return const Center(child: Text('No hay productos disponibles'));
        }
        return RefreshIndicator(
          onRefresh: () async => setState(_load),
          child: ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: productos.length,
            separatorBuilder: (_, __) => const SizedBox(height: 8),
            itemBuilder: (context, i) {
              final p = productos[i];
              return Card(
                child: ListTile(
                  leading: const CircleAvatar(
                    child: Icon(Icons.inventory_2_outlined),
                  ),
                  title: Text(p.nombre),
                  subtitle: p.descripcion != null ? Text(p.descripcion!) : null,
                  trailing: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      if (p.descuentoAplicado) ...[
                        Text(
                          '€${p.precio.toStringAsFixed(2)}',
                          style: const TextStyle(
                            decoration: TextDecoration.lineThrough,
                            color: Colors.grey,
                            fontSize: 12,
                          ),
                        ),
                        Text(
                          '€${p.precioFinal.toStringAsFixed(2)}',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Theme.of(context).colorScheme.primary,
                          ),
                        ),
                      ] else
                        Text(
                          '€${p.precioFinal.toStringAsFixed(2)}',
                          style: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                      TextButton(
                        style: TextButton.styleFrom(
                          padding: EdgeInsets.zero,
                          minimumSize: const Size(0, 0),
                          tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                        ),
                        onPressed: () => _verPrecio(p),
                        child: const Text('Ver precio',
                            style: TextStyle(fontSize: 12)),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        );
      },
    );
  }
}
