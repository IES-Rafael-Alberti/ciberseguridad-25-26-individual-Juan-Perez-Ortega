# 🐾 Clínica Veterinaria — Despliegue Seguro (FastAPI + Supabase)

Aplicación web minimalista que ejemplifica un ciclo completo de **Puesta en Producción Segura**: autenticación OAuth2/JWT, autorización RBAC+ABAC, gestión de secretos, SAST, SCA, DAST y despliegue reproducible en Render.

URL pública: **https://clinica-veterinaria-rxnp.onrender.com**

---

## 📂 Estructura

```
.
├── app/
│   ├── main.py                     # FastAPI (OAuth2, RBAC, ABAC, headers de seguridad)
│   └── schema.sql                  # DDL para Supabase
├── docs/img/                       # Capturas de evidencia
├── .env.example                    # APARTADO: GESTIÓN DE SECRETOS
├── sonar-project.properties        # APARTADO: SAST - SonarQube
├── render.yaml                     # APARTADO: DESPLIEGUE - Render
├── requirements.txt
└── README.md
```

Los workflows de CI/CD están en la raíz del repositorio (`.github/workflows/`):
- `security.yml` — SCA con OWASP Dependency-Check (se dispara en cada push).
- `zap.yml` — DAST con OWASP ZAP Baseline (manual / semanal).

---

## 🚀 Instrucciones de Despliegue

### 1. Preparar Supabase
1. Crear un proyecto en [supabase.com](https://supabase.com).
2. Abrir `SQL Editor` y ejecutar el contenido de `app/schema.sql`.
3. Copiar `Project URL` y `service_role key` (Settings → API).

![Tablas creadas en Supabase](docs/img/01-supabase-tablas.png)

### 2. Configurar repositorio
```bash
git clone <tu-repo>
cp .env.example .env   # rellenar secretos en local para pruebas
```

### 3. Ejecutar en local
```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
# Swagger UI: http://localhost:8000/docs
```

### 4. Despliegue en Render
1. En [render.com](https://render.com) → `New` → `Blueprint`.
2. Apuntar al repositorio; Render detectará `render.yaml`.
3. En el dashboard, en **Environment**, rellenar `SUPABASE_URL` y `SUPABASE_KEY` (marcados `sync: false`). `JWT_SECRET` se genera automáticamente.
4. `Apply` → se construye y publica.

![Servicio desplegado en Render](docs/img/13-render-deploy.png)

Comprobación de vida del servicio:

![Endpoint /health](docs/img/02-health.png)

Swagger UI servido desde Render:

![Swagger UI en producción](docs/img/13b-render-swagger.png)

![Swagger UI local](docs/img/03-swagger.png)

---

## 🔐 Autenticación y Autorización

### Registro (`POST /register`)

![Registro — request](docs/img/04-register-request.png)
![Registro — response](docs/img/04-register-response.png)

### Login y obtención de JWT (`POST /token`)

![Token — request](docs/img/05-token-request.png)
![Token — response](docs/img/05-token-response.png)

### RBAC — acceso denegado para rol insuficiente

![RBAC — 403 Forbidden](docs/img/06-rbac-403.png)
![RBAC — operación permitida](docs/img/06-rbac-ok.png)

### Gestión de recursos (mascotas)

![Crear mascota](docs/img/07-mascota-create.png)
![Listado de mascotas](docs/img/08-mascotas-list.png)
![RBAC — bloqueo al crear mascota](docs/img/09-rbac-403.png)

### Flujo de adopción

![Adopción de mascota](docs/img/10-adopcion.png)

### ABAC — descuento del 20 % si la clientela ha adoptado

![ABAC — descuento aplicado](docs/img/11-abac-descuento.png)

---

## 🔐 Mapa de Cumplimiento de Apartados

| Apartado | Ubicación |
|---|---|
| Modelos de datos + Supabase | `app/main.py` (sección MODELOS), `app/schema.sql` |
| Autenticación OAuth2 / JWT  | `app/main.py` (sección AUTENTICACIÓN OAUTH 2) |
| Autorización RBAC           | `app/main.py` (sección RBAC — `require_roles`) |
| Autorización ABAC           | `app/main.py` (función `aplicar_descuento_abac`) |
| Gestión de Secretos         | `.env.example` + `render.yaml` (`sync: false`) |
| SAST – SonarQube            | `sonar-project.properties` |
| SCA – OWASP Dependency Check| `.github/workflows/security.yml` |
| Despliegue – Render         | `render.yaml` |
| DAST – OWASP ZAP            | `.github/workflows/zap.yml` + sección DAST |
| Cabeceras de seguridad (opc.)| `SecurityHeadersMiddleware` en `app/main.py` |

---

## ⚙️ CI/CD — GitHub Actions

Los workflows se ejecutan automáticamente desde la pestaña *Actions* del repositorio.

![GitHub Actions — workflows](docs/img/12-github-actions.png)

### SCA — OWASP Dependency-Check

Reporte HTML generado por el workflow `security.yml` y publicado como artifact:

![Dependency-Check — reporte](docs/img/12b-dependency-check-report.png)

---

## 🛡️ APARTADO: DAST - OWASP ZAP

Escaneo dinámico sobre la URL en Render, automatizado con GitHub Actions (`.github/workflows/zap.yml`).

### Ejecución

El workflow se lanza manualmente desde la pestaña *Actions* → *Security - OWASP ZAP DAST* → `Run workflow`, o de forma programada (lunes 03:30 UTC). Invoca directamente la imagen Docker `ghcr.io/zaproxy/zaproxy:stable` con `zap-baseline.py` apuntando a la URL pública y sube el informe HTML/MD/JSON como artifact.

### Resultado — escaneo inicial (sin cabeceras de seguridad)

![ZAP — Summary (antes)](docs/img/14-zap-summary.png)
![ZAP — Alerts (antes)](docs/img/14b-zap-alerts.png)

Resumen del baseline inicial:

| Riesgo | Alertas |
|---|---|
| High | 0 |
| Medium | 3 |
| Low | 7 |
| Informational | 7 |

Las alertas *Medium* correspondían a falta de **CSP**, ausencia de **Anti-Clickjacking** (`X-Frame-Options` / `frame-ancestors`) y falta de **Subresource Integrity**. Las *Low* incluían ausencia de HSTS, X-Content-Type-Options, Permissions-Policy y cabeceras COOP/COEP/CORP.

### Mitigación — `SecurityHeadersMiddleware`

Se añadió un middleware en `app/main.py` que inyecta en cada respuesta las cabeceras recomendadas por OWASP Secure Headers Project:

- `Content-Security-Policy` (con origenes permitidos sólo los necesarios para Swagger)
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` restrictiva
- `Strict-Transport-Security` (HSTS)
- `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`, `Cross-Origin-Embedder-Policy`
- Elimina la cabecera `Server` (reducción de fingerprinting)

### Resultado — escaneo tras el middleware

![ZAP — Summary (después)](docs/img/14c-zap-summary-post.png)
![ZAP — Alerts (después)](docs/img/14d-zap-alerts-post.png)

| Riesgo | Antes | Después | Δ |
|---|---|---|---|
| High | 0 | 0 | — |
| Medium | 3 | **0** | −3 ✅ |
| Low | 7 | 3 | −4 ✅ |
| Informational | 7 | 5 | −2 ✅ |

El middleware elimina todas las alertas *Medium* y reduce significativamente las *Low*, cerrando el ciclo DAST → mitigación → verificación.

---

## 🧪 Usuarios de prueba (roles RBAC)

| Rol | Capacidad |
|---|---|
| `admin`       | Acceso total |
| `veterinario` | Crear mascotas |
| `ventas`      | Crear productos |
| `clientela`   | Adoptar, ver catálogo (recibe 20% ABAC si ha adoptado) |
