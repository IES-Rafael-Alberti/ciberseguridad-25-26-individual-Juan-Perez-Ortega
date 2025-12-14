# Levantar .NET con Docker y creación de la API

## 1. Verificar instalación de .NET

Miramos si tenemos .NET instalado en nuestro ordenador con el comando:

```bash
dotnet --version
```

En caso de que no lo tengamos instalado, accedemos a la página principal y lo instalamos:  
[Descargar .NET 8.0](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)

![Verificación de que tenemos .NET instalado](img/VerificacionNet.jpg)

---

## 2. Crear carpeta para la API

Creamos la carpeta donde vamos a levantar nuestra API:

![Creación de las carpetas](img/CreacionCarpeta.jpg)

Luego, creamos un nuevo proyecto basado en la plantilla de Web API de ASP.NET Core:

```bash
dotnet new webapi -n DotnetCrudApi
```

- `-n DotnetCrudApi` asigna el nombre al proyecto y crea automáticamente una subcarpeta con ese nombre.

---

## 3. Crear carpetas Models y Controllers

Creamos dos carpetas:  

- `Models`: Define los tipos de datos que maneja la API.  
- `Controllers`: Contiene los métodos que se ejecutan cuando hacemos una petición (por ejemplo, desde Postman).

**Carpeta Models**  

![Carpeta Model](img/CarpetaModels.jpg)

**Carpeta Controllers**  

![Carpeta Controllers](img/CarpetaControllorers.jpg)

---

## 4. Crear Dockerfile

Creamos el `Dockerfile`:

![Creación del Dockerfile](img/CreacionDockerfile.jpg)

---

## 5. Construcción de la imagen de Docker

Creamos la imagen en Docker con el siguiente comando:

```bash
docker build -t mi-app-dotnet:latest .
```

![Construcción de la imágen de Docker](img/ImagenDocker.jpg)

---

## 6. Crear el contenedor de Docker

![Contenedor Docker](img/ContenedorDocker.jpg)

---

## 7. Diferentes peticiones desde Postman

Probamos la API desde Postman con distintas operaciones:

**Crear un nuevo dato**  

![CreateNet](img/CreateNet.jpg)

**Leer dato/s**  

![ReadNet](img/ReadNet.jpg)

**Actualizar datos**  

![UpdateDato](img/DeleteDato.jpg)

**Eliminar datos**  

![Delete datos](img/DeleteDato.jpg)


# Creación de SpringBoot con Docker y la API

1º Creación de carpetas

![Creación de las carpetas](img/CreacionCarpetas.jpg)

2º SpringBoot

Accedemos a la página oficial de SpringBoot para descargar el archivo

https://start.spring.io/

![SpringBoot](img/SpringBoot.jpg)

![Archivos SpringBoot](img/ArchivosSpringBoot.jpg)

3º Descarga e instalación de SpringBoot

Descargamos e instalamos los paquetes

![SpringBoot descarga y actualización](img/SpringBootDescargardoYActualizado.jpg)

![SpringBoot descarga y actualización](img/SpringBootDescargardoYActualizado2ºparte.jpg)

4º Creación del archivo Dockerfile

Creamos el archivo Dockerfile

![Creacion Dockerfile](img/DockerBuild.jpg)

5º Creación de las carpetas de Model y Controllers y sus archivos

![Model](img/Model.jpg)

![Controller](img/Controller.jpg)

6º Montarlo en Docker

Montamos SpringBoot en Docker

![Docker Run](img/DockerRun.jpg)

7º CRUD

Para comprobar el funcionamiento con Postman creamos leeremos actualizaremos y eliminaremos datos de prueba

8º Create

![Create](img/Create.jpg)

9º Read

![Read](img/Read.jpg)

10º Update

![Update](img/Update.jpg)

11º Delete

![Delete](img/Delete.jpg)
