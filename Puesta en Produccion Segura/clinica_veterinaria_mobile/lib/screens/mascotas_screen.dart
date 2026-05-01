import 'package:flutter/material.dart';
import '../models/mascota.dart';
import '../services/api_service.dart';

class MascotasScreen extends StatefulWidget {
  const MascotasScreen({super.key});

  @override
  State<MascotasScreen> createState() => _MascotasScreenState();
}

class _MascotasScreenState extends State<MascotasScreen> {
  final _api = ApiService();
  late Future<List<Mascota>> _future;

  @override
  void initState() {
    super.initState();
    _load();
  }

  void _load() {
    _future = _api.getMascotas().then(
          (list) => list
              .map((e) => Mascota.fromJson(e as Map<String, dynamic>))
              .toList(),
        );
  }

  Future<void> _adoptar(Mascota mascota) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Confirmar adopción'),
        content: Text('¿Quieres adoptar a ${mascota.nombre}?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancelar'),
          ),
          FilledButton(
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Adoptar'),
          ),
        ],
      ),
    );
    if (confirm != true || !mounted) return;
    try {
      await _api.adoptarMascota(mascota.id);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('¡Has adoptado a ${mascota.nombre}! 🐾')),
        );
        setState(_load);
      }
    } catch (_) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Error al procesar la adopción')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Mascota>>(
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
                const Text('Error al cargar mascotas'),
                const SizedBox(height: 8),
                FilledButton.tonal(
                  onPressed: () => setState(_load),
                  child: const Text('Reintentar'),
                ),
              ],
            ),
          );
        }

        final mascotas   = snap.data!;
        final disponibles = mascotas.where((m) => !m.adoptada).toList();
        final adoptadas   = mascotas.where((m) => m.adoptada).toList();

        return RefreshIndicator(
          onRefresh: () async => setState(_load),
          child: ListView(
            padding: const EdgeInsets.all(16),
            children: [
              if (disponibles.isNotEmpty) ...[
                const Text('Disponibles para adopción',
                    style: TextStyle(
                        fontWeight: FontWeight.bold, fontSize: 16)),
                const SizedBox(height: 8),
                ...disponibles.map((m) => _MascotaCard(
                      mascota: m,
                      onAdoptar: () => _adoptar(m),
                    )),
                const SizedBox(height: 24),
              ],
              if (adoptadas.isNotEmpty) ...[
                Text('Ya adoptadas',
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                        color: Colors.grey.shade600)),
                const SizedBox(height: 8),
                ...adoptadas.map((m) => _MascotaCard(mascota: m)),
              ],
              if (mascotas.isEmpty)
                const Center(
                    child: Padding(
                  padding: EdgeInsets.all(32),
                  child: Text('No hay mascotas disponibles'),
                )),
            ],
          ),
        );
      },
    );
  }
}

class _MascotaCard extends StatelessWidget {
  final Mascota mascota;
  final VoidCallback? onAdoptar;

  const _MascotaCard({required this.mascota, this.onAdoptar});

  IconData get _icon {
    switch (mascota.especie.toLowerCase()) {
      case 'perro':
        return Icons.pets;
      case 'gato':
        return Icons.catching_pokemon;
      default:
        return Icons.cruelty_free;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: mascota.adoptada
              ? Colors.grey.shade200
              : Theme.of(context).colorScheme.primaryContainer,
          child: Icon(_icon,
              color: mascota.adoptada
                  ? Colors.grey
                  : Theme.of(context).colorScheme.primary),
        ),
        title: Text(mascota.nombre),
        subtitle: Text('${mascota.especie} · ${mascota.edad} años'),
        trailing: mascota.adoptada
            ? Chip(
                label: const Text('Adoptada'),
                backgroundColor: Colors.grey.shade200,
              )
            : FilledButton.tonal(
                onPressed: onAdoptar,
                child: const Text('Adoptar'),
              ),
      ),
    );
  }
}
