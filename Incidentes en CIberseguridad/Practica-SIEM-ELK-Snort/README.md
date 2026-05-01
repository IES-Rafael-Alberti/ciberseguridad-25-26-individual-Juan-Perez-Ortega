# Práctica SIEM — ELK Stack 8 + Snort 3

**Autor:** Juan Pérez Ortega
**Módulo:** Incidentes en Ciberseguridad

SIEM independiente con Elastic Stack 8.15.3 y Snort 3 desplegado con Docker Compose.

---

## Fase 1 — Elasticsearch + Kibana

Levantamos el núcleo del SIEM: el motor de indexación y la interfaz web.

**Ajuste previo del kernel (obligatorio para Elasticsearch):**

```powershell
wsl -d docker-desktop -u root sysctl -w vm.max_map_count=262144
```

**Arrancar los servicios:**

```bash
docker compose up -d elasticsearch kibana
```

**Verificar que Elasticsearch está operativo:**

Abrir en el navegador → `http://localhost:9200/_cluster/health?pretty`

Debe aparecer `"status": "green"`.

**Acceder a Kibana:**

Abrir en el navegador → `http://localhost:5601`

**Capturas de evidencia:**

![Elasticsearch health](./imagenes/fase1-es-health.png)

![Kibana ready](./imagenes/fase1-kibana-ready.png)

---

## Fase 2 — Sensor IDS Snort 3

> *Pendiente*

---

## Fase 3 — Pipeline Logstash + Filebeat

> *Pendiente*

---

## Fase 4 — Visualización en Kibana

> *Pendiente*

---

## Fase 5 — Simulación de ataques reales

> *Pendiente*
