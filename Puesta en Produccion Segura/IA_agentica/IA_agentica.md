# Informe de Implementación: Agente Autónomo Local
**Entorno:** Parrot OS / Antigravity (VS Code)
**Tecnologías:** Ollama, Docker, Protocolo MCP, Cline.

---

## 1. Introducción y Arquitectura
El objetivo de esta práctica es el despliegue de un agente de inteligencia artificial con capacidades de actuación autónoma sobre el sistema operativo. Se ha optado por una arquitectura **100% local** para garantizar la privacidad, eliminar latencias de red y evitar la dependencia de APIs comerciales de terceros.

## 2. Implementación del Motor de Inferencia: Ollama
Para el procesamiento del lenguaje natural, se ha utilizado **Ollama** como servidor de modelos local:
* **Instalación**: Se desplegó el motor de Ollama en Parrot OS mediante el script oficial de sistemas Linux.
* **Optimización por Hardware**: El sistema fue configurado para detectar y utilizar la **GPU AMD** (vía ROCm), permitiendo que el modelo procese información de forma fluida sin saturar la CPU.
* **Selección del Modelo**: Se instaló el modelo `qwen2.5-coder:7b`, específicamente entrenado para la generación de código y la ejecución de instrucciones técnicas.

---

![Instalacion de Ollama](/IA_agentica/img/Ollama.png)

---

## 3. Configuración del Agente Agéntico: Cline
**Cline** actúa como la interfaz de control y razonamiento. Se vinculó con el motor local siguiendo estos parámetros:
* **Proveedor de API**: Ollama.
* **Base URL**: `http://localhost:11434` (conexión interna).
* **Model ID**: `qwen2.5-coder:7b`.
* **Modo de Operación**: Se activó el modo **"Act"**, permitiendo que el agente no solo sugiera cambios, sino que pueda ejecutar comandos de terminal y editar archivos tras la aprobación del usuario.

---

![Configuracion de la API](/IA_agentica/img/ConfiguracionAPI.png)

---

## 4. Integración de Capacidades Avanzadas: MCP y Docker
Para dotar al agente de herramientas del "mundo real" y cumplir con el estándar agéntico, se implementó el protocolo MCP:
* **Protocolo MCP (Model Context Protocol)**: Se configuró Cline para que pueda conectarse a servidores externos que proporcionan herramientas adicionales (como navegación web, búsqueda en bases de datos o inspección de archivos).
* **Infraestructura con Docker**: Se integró **Docker Desktop** como la base de ejecución. Muchos de los servidores de herramientas MCP se ejecutan dentro de contenedores Docker, lo que permite al agente levantar entornos de ejecución aislados y seguros para realizar tareas complejas sin comprometer la estabilidad del sistema anfitrión.

## 5. Pruebas de Concepto y Evidencias
El agente ha demostrado autonomía para realizar las siguientes tareas en el entorno Parrot OS:
1.  **Exploración del Entorno**: Capacidad para leer la estructura de directorios y entender el contexto del proyecto.
2.  **Actuación en el Sistema**: Creación automática de carpetas de laboratorio y archivos de configuración.
3.  **Ejecución de Herramientas**: Uso de contenedores Docker para extender sus capacidades de procesamiento mediante el protocolo MCP.


