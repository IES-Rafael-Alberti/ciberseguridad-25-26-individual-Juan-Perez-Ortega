# Informe de Prácticas: Auditoría con IA Agéntica (Gemini + HexStrike)

## 1. Instalación de dependencias en Parrot OS
Iniciamos preparando el sistema con las herramientas necesarias para que el servidor MCP de HexStrike pueda interactuar con el sistema operativo.

![Instalación de dependencias y herramientas de red](/Puesta%20en%20Produccion%20Segura/HextrikeMCP/img/Herramientas.png)
---

## 2. Instalación y despliegue de HexStrike
Procedemos a clonar el repositorio, configurar el entorno virtual de Python y levantar el servidor de herramientas ofensivas.

```bash
# Clonar repositorio e instalar entorno
git clone [https://github.com/hexstrike-ai/hexstrike.git](https://github.com/hexstrike-ai/hexstrike.git)
cd hexstrike-ai
python3 -m venv hexstrike-env
source hexstrike-env/bin/activate
pip install -r requirements.txt

# Iniciar el servidor en el puerto 8888
python3 hexstrike_server.py --port 8888
```

![Instalación de Hestrike](/img/InstalacionHextrike.png)

---

## 3. Instalación de Gemini CLI
Configuramos el cliente de Gemini para actuar como el cerebro de nuestra operación.

```bash
# Instalación global del cliente
npm install -g @google/gemini-cli
gemini login
```
![Instalación de Geminis](/img/InstalacionGeminis.png)
---

## 4. Vinculación MCP (Gemini + HexStrike)
Para conectar la IA con las herramientas locales, añadimos el servidor MCP. Debido a errores de ejecución previos (ENOENT), utilizamos la ruta absoluta del script puente.

```bash
# Vincular Gemini con el servidor local HexStrike
gemini mcp add hexstrike-ai python3 -- /home/nito/Documentos/hexstrike-ai/hexstrike_mcp.py --server [http://127.0.0.1:8888](http://127.0.0.1:8888)
```

**Comprobación de Conexión**

Verificamos que el estado del servidor aparece como Connected.

```bash
gemini mcp list
```

![Estado de conexión entre Gemini y HexStrike](/img/HextrikeGeminisFuncionando.png)
---

## 5. Despliegue del Laboratorio (DockerLabs)

Descomprimimos la máquina "Wargames", cargamos la imagen en Docker y la ponemos en funcionamiento para obtener la IP víctima.


```bash
# Carga y ejecución del contenedor
sudo docker load -i wargames.tar
sudo docker run -d --name victima-wargames wargames:latest

# Identificación de la IP del objetivo
sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' victima-wargames
```
![Despliegue del contenedor y obtención de la IP 172.17.0.2](/img/Dockerlabs.png)

---

---

## 6. Ejecución del Escaneo y Análisis Agéntico
En esta fase, se pone a prueba la integración. En lugar de ejecutar los comandos manualmente, se le da una instrucción en lenguaje natural a Gemini CLI. La IA interpreta la necesidad, selecciona la herramienta `nmap` de nuestro servidor HexStrike y procesa los resultados.

### Interacción con la IA
Se accede a la terminal de Gemini y se lanza el siguiente prompt de auditoría:

**Prompt:**
> "He desplegado la máquina 'Wargames' en mi red local de Docker con la IP 172.17.0.2. Actúa como un experto en ciberseguridad y utiliza la herramienta 'nmap' de mi servidor MCP 'hexstrike-ai' para realizar un escaneo detallado. Dime qué puertos están abiertos y analiza si hay servicios vulnerables para mi informe."

### Verificación de ejecución en tiempo real
Para confirmar que el agente está funcionando, se monitorizan las dos terminales activas:

1. **Terminal de Gemini**: Muestra el progreso del pensamiento de la IA y el output final interpretado.
2. **Terminal de HexStrike**: Registra las llamadas a las herramientas locales (Logs de actividad).

![Geminis trabajando](/img/GeminisTrabajando.png)

---

![HexStrike trabajando](/img/HextrikeTrabajando.png)

---


## 7. Análisis de Resultados y Hallazgos
Tras el escaneo agéntico realizado sobre la IP 172.17.0.2, el agente Gemini ha procesado la salida de Nmap e identificado los siguientes servicios críticos:

### Tabla de Puertos y Servicios Detectados
| Puerto | Servicio | Versión / Detalle | Riesgo |
| :--- | :--- | :--- | :--- |
| **21** | FTP | vsftpd 3.0.5 | Bajo |
| **22** | SSH | OpenSSH 10.0p2 (Debian) | Bajo |
| **80** | HTTP | Apache httpd 2.4.65 | Medio |
| **5000** | Desconocido | Interfaz interactiva ("WOPR") | **Crítico** |

---

![Tabla de puertos y servicios detectados](/img/Escaneosdepuertos.png)

---

### Vectores de Ataque Identificados
El análisis de la IA ha determinado que la superficie de ataque principal se encuentra en el **puerto 5000**:

1.  **Explotación del Servicio WOPR**: Se ha detectado una interfaz interactiva que responde con mensajes temáticos de la película "Juegos de Guerra". La presencia de comandos como `logon Joshua` sugiere un posible vector de entrada mediante fuerza bruta o credenciales por defecto.
2.  **Enumeración Web**: El puerto 80 presenta un servidor Apache con el título "Wopr", lo que indica una relación directa con el servicio del puerto 5000 y un posible punto para realizar fuzzing de directorios.

### Conclusión Técnica
La integración de **Gemini + HexStrike** ha permitido automatizar la fase de reconocimiento de forma exitosa. La IA no solo ha ejecutado la herramienta, sino que ha interpretado correctamente el contexto de la máquina (CTF temática) y ha recomendado priorizar el puerto 5000 para la intrusión, demostrando una capacidad de análisis superior a un escaneo tradicional.