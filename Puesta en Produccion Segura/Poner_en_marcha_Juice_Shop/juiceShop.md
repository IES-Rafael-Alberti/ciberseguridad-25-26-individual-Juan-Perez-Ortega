# Informe de Auditoría de Seguridad: OWASP Juice Shop

**Fecha:** 27/01/2026
**Auditor:** [Juan Pérez Ortega]
**Objetivo:** Despliegue de entorno de pruebas y detección inicial de vulnerabilidades.

---

## Tabla de Contenidos

1. [1. Preparación del Entorno](#1-preparación-del-entorno)
    * [1.1 Método de Instalación](#11-método-de-instalación)
2. [2. Hallazgos de Vulnerabilidades](#2-hallazgos-de-vulnerabilidades)
    * [2.2 Inyección SQL (SQLi) en Login](#22-inyección-sql-sqli-en-login)
    * [2.3 Exposición de Datos Sensibles (Directory Listing)](#23-exposición-de-datos-sensibles-directory-listing)
    * [2.4 Cross-Site Scripting Persistente (Stored XSS)](#24-cross-site-scripting-persistente-stored-xss)

---

## 1. Preparación del Entorno

Para realizar las pruebas de seguridad, se ha desplegado una instancia local de **OWASP Juice Shop** utilizando tecnología de contenedores para garantizar un entorno aislado y controlado.

![Texto Alternativo de la imagen](/Poner_en_marcha_Juice_Shop/img/PaginaIncioOWASP.png)

### 1.1 Método de Instalación

Se ha utilizado la imagen oficial de Docker (`bkimminich/juice-shop`).

**Comando de ejecución:**
```bash
docker run --rm -p 3000:3000 bkimminich/juice-shop
```

## 2. Hallazgos de vulnerabilidades


### 2.2 Inyección SQL (SQLi) en Login

| Metadato | Descripción |
| :--- | :--- |
| **Severidad** | **Crítica** |
| **Ubicación** | Formulario de Login (`/login`) |
| **Estado** | Explotado (Acceso Admin conseguido) |

**Descripción del Fallo:**
El formulario de autenticación concatena directamente la entrada del usuario en la consulta SQL de la base de datos (SQLite) sin utilizar sentencias preparadas (Prepared Statements).

**Prueba de Concepto (PoC):**
1. Navegar a `/login`.
2. En el campo "Email", introducir el payload: `' OR 1=1 --`
3. Introducir cualquier valor en el campo "Password".
4. Enviar el formulario.

**Resultado:**
La aplicación permite el acceso inmediato con privilegios de administrador (`admin@juice-sh.op`), saltándose la verificación de contraseña.

![Texto Alternativo de la imagen](/Poner_en_marcha_Juice_Shop/img/Administrator.png)

**Impacto:**
Acceso total a la cuenta de administrador, lo que permite ver todos los usuarios, modificar productos, acceder a datos sensibles y comprometer completamente la aplicación.

**Remediación:**
Utilizar "Prepared Statements" (Consultas Parametrizadas) en el backend para que la base de datos distinga entre el código SQL y los datos del usuario.


### 2.3 Exposición de Datos Sensibles (Directory Listing)

| Metadato | Descripción |
| :--- | :--- |
| **Severidad** | **Media** |
| **Ubicación** | Directorio público (`/ftp`) |
| **Estado** | Verificado |

**Descripción del Fallo:**
El servidor web tiene habilitado el listado de directorios (Directory Listing) en la ruta `/ftp`. No existen restricciones de acceso adecuadas, permitiendo a cualquier usuario visualizar y descargar archivos internos de la organización.

**Prueba de Concepto (PoC):**
1. Navegar directamente a la URL `http://localhost:3000/ftp`.
2. Se observa el listado de archivos del servidor.
3. Se descarga el archivo `acquisitions.md`, el cual contiene información confidencial sobre planes de negocio.

![Texto Alternativo de la imagen](/Poner_en_marcha_Juice_Shop/img/ftp.png)

**Impacto:**
Fuga de información sensible (backup de configuraciones, notas internas, documentos legales) que puede ser utilizada para planificar ataques más complejos o para espionaje corporativo.

**Remediación:**
Deshabilitar la navegación de directorios en la configuración del servidor web y restringir el acceso a rutas sensibles únicamente a personal autorizado.


### 2.4 Cross-Site Scripting Persistente (Stored XSS)

| Metadato | Descripción |
| :--- | :--- |
| **Severidad** | **Alta / Crítica** |
| **Ubicación** | Formulario de "Customer Feedback" |
| **Estado** | Explotado |

**Descripción del Fallo:**
La aplicación almacena los comentarios de los usuarios en la base de datos sin sanitizar el contenido HTML/JS. Posteriormente, cuando un administrador visualiza estos comentarios en el panel de control, el código se ejecuta automáticamente.

**Prueba de Concepto (PoC):**
1. Ir a la sección "Contact Us".
2. En el comentario, insertar: `<iframe src="javascript:alert('Stored XSS')">`
3. Enviar el feedback.
4. Acceder con credenciales de administrador al panel `/administration`.
5. Al cargar la lista de feedback, el script se ejecuta automáticamente.

![Texto Alternativo de la imagen](/Poner_en_marcha_Juice_Shop/img/Xss.png)
**Impacto:**
Este es un ataque persistente. Permite atacar a usuarios con altos privilegios (Administradores) simplemente esperando a que revisen los registros. Podría usarse para crear nuevos usuarios administradores ocultos o robar la sesión del administrador real.

**Remediación:**
Sanitizar estrictamente toda entrada que vaya a ser almacenada en la base de datos y codificar los datos al mostrarlos en el panel de administración.