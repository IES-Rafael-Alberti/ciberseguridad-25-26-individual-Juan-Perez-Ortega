# Práctica SIEM con ELK Stack y Suricata IDS

**Módulo:** Incidentes en Ciberseguridad  
**Alumno:** Juan Pérez Ortega  

---

## Índice

1. [Arquitectura](#arquitectura)
2. [Nota sobre Suricata vs Snort](#nota-sobre-suricata-vs-snort)
3. [Fase 1 — Infraestructura base (Elasticsearch + Kibana)](#fase-1--infraestructura-base-elasticsearch--kibana)
4. [Fase 2 — Sensor IDS (Suricata)](#fase-2--sensor-ids-suricata)
5. [Fase 3 — Pipeline de ingesta (Logstash + Filebeat)](#fase-3--pipeline-de-ingesta-logstash--filebeat)
6. [Fase 4 — Visualización (Kibana Dashboard)](#fase-4--visualización-kibana-dashboard)
7. [Fase 5 — Simulación de ataque (Kali + Hydra)](#fase-5--simulación-de-ataque-kali--hydra)
 
---

## Arquitectura

```
Tráfico de red
      ↓
 Suricata IDS          → detecta ICMP(Protocolo de Mensajes de Control de Internet) y fuerza bruta SSH
      ↓
  Filebeat             → lee eve.json y envía a Logstash
      ↓
  Logstash             → normaliza y filtra solo alertas
      ↓
Elasticsearch          → indexa en suricata-YYYY.MM.dd
      ↓
   Kibana              → visualiza en dashboard
```

**Red interna Docker:** `siem-net` — subred `172.30.0.0/24`

| Contenedor    | IP             | Puerto |
|---------------|----------------|--------|
| Elasticsearch | 172.30.0.10    | 9200   |
| Kibana        | 172.30.0.11    | 5601   |
| Logstash      | 172.30.0.12    | 5044   |
| Suricata      | 172.30.0.20    | 22     |
| Kali          | 172.30.0.100   | —      |

---

## Nota sobre Suricata vs Snort

La práctica fue diseñada originalmente con Snort 3, pero `snort3` no está disponible en los repositorios oficiales de Ubuntu 22.04 ni Ubuntu 24.04. Se ha utilizado **Suricata** como alternativa técnicamente superior:

- Suricata es **multihilo** (Snort 2 es monohilo)
- Genera **EVE JSON nativo**, compatible directamente con Filebeat y Logstash sin parsers adicionales
- Es el IDS estándar en la industria actualmente, mantenido por la OISF
- Usa la **misma sintaxis de reglas** que Snort

---

## Fase 1 — Infraestructura base (Elasticsearch + Kibana)

Levantamos Elasticsearch y Kibana sobre un contenedor Docker con una red interna con IPs estáticas.

```bash
docker compose up -d
docker ps -a
curl.exe http://localhost:9200
```

| Captura | Descripción |
|---------|-------------|
| `Imágenes/fase1-docker-up.png` | Contenedores en estado healthy |
| `Imágenes/fase1-elasticsearch.png` | Elasticsearch respondiendo en localhost:9200 |
| `Imágenes/fase1-kibana.png` | Kibana accesible en localhost:5601 |

---

## Fase 2 — Sensor IDS (Suricata)

Ahora vamos a construir y arrancar el contenedor Suricata en donde usamos- reglas de detección ICMP y fuerza bruta SSH. Suricata escribe las alertas en `/var/log/suricata/eve.json` en formato EVE JSON (Extensible Event Format) 
.

**Reglas configuradas (`snort/rules/local.rules`):**
- ICMP: alerta en cada ping (echo request) hacia la red interna
- SSH: alerta cuando una misma IP supera 5 conexiones SYN al puerto 22 en 60 segundos

```bash
# Construir la imagen y arrancar Suricata
docker compose --profile fase2 up -d --build

# Verificar que Suricata está corriendo
docker ps

# Lanzar un ping para generar una alerta ICMP
docker exec -it suricata ping -c 4 172.30.0.10

# Ver las alertas generadas en tiempo real
docker exec suricata tail -f /var/log/suricata/eve.json
```

| Captura | Descripción |
|---------|-------------|
| `Imágenes/fase2-build-suricata.png` | Build del contenedor Suricata completado |
| `Imágenes/fase2-alerta-icmp.png` | Alerta ICMP visible en eve.json |

---

## Fase 3 — Pipeline de ingesta (Logstash + Filebeat)

Arrancar Logstash y configurar Filebeat dentro del contenedor Suricata para enviar las alertas EVE JSON a Elasticsearch. El pipeline filtra únicamente eventos de tipo `alert`.

**Flujo:** Filebeat lee `eve.json` → envía a Logstash (puerto 5044) → Logstash normaliza y filtra → Elasticsearch indexa en `suricata-YYYY.MM.dd`

```bash
# Arrancar Logstash
docker compose --profile fase3 up -d

# Instalar y arrancar Filebeat dentro del contenedor Suricata
docker exec -it suricata bash

# (dentro del contenedor)
curl -k -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-8.15.3-linux-x86_64.tar.gz
tar xzf filebeat-8.15.3-linux-x86_64.tar.gz
cd filebeat-8.15.3-linux-x86_64
./filebeat -e &

# Verificar que el índice se ha creado en Elasticsearch
curl.exe http://localhost:9200/_cat/indices/suricata*?v
```

| Captura | Descripción |
|---------|-------------|
| `Imágenes/fase3-indice-es.png` | Índice `suricata-*` creado en Elasticsearch con documentos |

---

## Fase 4 — Visualización (Kibana Dashboard)

Crear el Data View en Kibana apuntando al índice `suricata-*` y construir un dashboard con dos visualizaciones.

**Pasos en Kibana:**
1. Stack Management → Data Views → Create data view → patrón `suricata-*`, timestamp `@timestamp`
2. Discover → seleccionar data view "Suricata Alerts" → verificar alertas
3. Dashboards → Create dashboard → añadir dos visualizaciones:
   - **Alertas por Tiempo**: gráfico de barras con `@timestamp` en eje X
   - **Tipos de Alerta**: gráfico donut con `alert.signature.keyword`

| Captura | Descripción |
|---------|-------------|
| `Imágenes/fase4-data-view.png` | Data View `suricata-*` creado con 55 campos |
| `Imágenes/fase4-discover.png` | Alertas visibles en Discover |
| `Imágenes/fase4-dashboard.png` | Dashboard con visualizaciones de alertas |

---

## Fase 5 — Simulación de ataque (Kali + Hydra)

Arrancar el contenedor Kali como atacante y simular dos tipos de ataque contra Suricata para validar la detección del SIEM.

```bash
# Arrancar el contenedor Kali
docker compose --profile fase5 up -d

# Entrar en Kali
docker exec -it kali-attacker bash

# Instalar herramientas
apt-get update && apt-get install -y hydra iputils-ping wordlists
gunzip /usr/share/wordlists/rockyou.txt.gz

# Ataque 1: ping ICMP (genera alertas sid:1000001)
ping -c 10 172.30.0.20

# Ataque 2: fuerza bruta SSH con Hydra (genera alertas sid:1000002)
hydra -l victim -P /usr/share/wordlists/rockyou.txt ssh://172.30.0.20 -t 4 -V
```

Hydra encuentra la contraseña `victimpass` del usuario `victim` configurado en el contenedor Suricata.

| Captura | Descripción |
|---------|-------------|
| `Imágenes/fase5-alerta-icmp-kali.png` | Alertas ICMP desde Kali visibles en Discover |
| `Imágenes/fase5-alerta-ssh-hydra.png` | Alertas de fuerza bruta SSH en Discover |
| `Imágenes/fase5-dashboard-final.png` | Dashboard con ambos tipos de alerta |
