# Proeycto 6: Un dashboard imprescindible en el SOC
**Asignatura:** Bastionado de Redes y Sistemas
**Herramientas seleccionadas:** Zabbix & Prometheus
**Entorno de despliegue:** Docker Containers

--- 

## 1. Introducción a los Entornos.

Para esta comparativa, se han seleccionado dos de las herramientas más potentes y utilizadas en la industria actual, ambas desplegadas sobre contenedores Docker para garantizar portabilidad y eficiencia.


### **Zabbix (El Enfoque Integral)**

Está diseñado para monitorizar y registrar el estado de varios servicios de red, Servidores, y hardware de red.

* **Arquitectura**: Basada en servidor central con base de datos relacional.

* **Método**: Utiliza agentes, SNMP y chequeos sin agente.

**Prometheus (El Enfoque Cloud-Native)**

Prometheus es un sistema de monitoreo y alerta de código abierto originalmente construido por SoundCloud. Es la herramienta estándar para entornos de microservicios y Kubernetes.

* **Arquitectura:** Basada en el almacenamiento de series temporales (TSDB).

* **Método:** Modelo "Pull" mediante la exposición de métricas en puntos finales HTTP.

## 2. Comparativa Técnica de Características 

A continuación, se comparan 7 características clave para determinar las capacidades de cada sistema:

| Característica | Zabbix (v6.4+) | Prometheus (v2.x) |
| :--- | :--- | :--- |
| **Arquitectura de Datos** | Relacional (Basada en MySQL/PostgreSQL). | Basada en Series Temporales (TSDB). |
| **Modelo de Captura** | Principalmente **Push** (Agente envía datos). | Principalmente **Pull** (Servidor pide datos). |
| **Configuración** | Interfaz Gráfica (GUI) integrada. | Archivos de configuración YAML. |
| **Visualización** | Gráficos, Mapas y Dashboards nativos. | Básica (requiere Grafana para dashboards). |
| **Gestión de Alertas** | Integrada (Acciones, Media Types). | Externa (requiere Alertmanager). |
| **Monitoreo de Red** | Soporte nativo robusto para SNMP e IPMI. | Requiere "SNMP Exporter" adicional. |
| **Detección Automática** | Network Discovery y Auto-registration. | Service Discovery (DNS, Kubernetes, EC2). |