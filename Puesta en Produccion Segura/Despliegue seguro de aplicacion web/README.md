# 🐾 Clínica Veterinaria — Despliegue Seguro (FastAPI + Supabase)

Aplicación web minimalista que ejemplifica un ciclo completo de **Puesta en Producción Segura**: autenticación OAuth2/JWT, autorización RBAC+ABAC, gestión de secretos, SAST, SCA, DAST y despliegue reproducible en Render.

---

## 📂 Estructura

```
.
├── app/
│   ├── main.py          # Aplicación FastAPI (OAuth2, RBAC, ABAC)
│   └── schema.sql       # DDL para Supabase
├── .env.example         # APARTADO: GESTIÓN DE SECRETOS
├── sonar-project.properties   # APARTADO: SAST - SonarQube
├── .github/workflows/security.yml  # APARTADO: RCA - OWASP Dependency Check
├── render.yaml          # APARTADO: DESPLIEGUE - Render
├── requirements.txt
└── README.md
```

---

## 🚀 Instrucciones de Despliegue

### 1. Preparar Supabase
1. Crear un proyecto en [supabase.com](https://supabase.com).
2. Abrir `SQL Editor` y ejecutar el contenido de `app/schema.sql`.
3. Copiar `Project URL` y `service_role key` (Settings → API).

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
4. `Apply` → se construye y publica. La URL tendrá el patrón `https://clinica-veterinaria.onrender.com`.

### 5. Crear primer usuario admin
```bash
curl -X POST https://<tu-url>.onrender.com/register \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@clinica.com","password":"SuperSegura123!","role":"admin"}'
```

---

## 🔐 Mapa de Cumplimiento de Apartados

| Apartado | Ubicación |
|---|---|
| Modelos de datos + Supabase | `app/main.py` (sección MODELOS), `app/schema.sql` |
| Autenticación OAuth2 / JWT  | `app/main.py` (sección AUTENTICACIÓN OAUTH 2) |
| Autorización RBAC           | `app/main.py` (sección RBAC — `require_roles`) |
| Autorización ABAC           | `app/main.py` (función `aplicar_descuento_abac`) |
| Gestión de Secretos         | `.env.example` + `render.yaml` (`sync: false`) |
| SAST – SonarQube            | `sonar-project.properties` + workflow `security.yml` |
| RCA – OWASP Dependency Check| `.github/workflows/security.yml` |
| Despliegue – Render         | `render.yaml` |
| DAST – OWASP ZAP            | Sección siguiente de este README |

---

## 🛡️ APARTADO: DAST - OWASP ZAP

Guía paso a paso para realizar el escaneo dinámico sobre la URL desplegada en Render.

### Prerrequisitos
- Aplicación desplegada y accesible (p. ej. `https://clinica-veterinaria.onrender.com`).
- [OWASP ZAP](https://www.zaproxy.org/download/) instalado (o imagen Docker `zaproxy/zap-stable`).
- Un usuario válido creado mediante `POST /register` para ejecutar escaneo autenticado.

### Paso 1 — Baseline Scan (pasivo, sin autenticación)
Escaneo rápido que sólo observa tráfico y detecta cabeceras/configuraciones débiles.
```bash
docker run --rm -t zaproxy/zap-stable zap-baseline.py \
    -t https://clinica-veterinaria.onrender.com \
    -r baseline-report.html
```
Revisar `baseline-report.html`: cabeceras de seguridad (`Strict-Transport-Security`, `X-Content-Type-Options`, `Content-Security-Policy`), cookies inseguras, divulgación de información.

### Paso 2 — Full Scan (activo, requiere autorización)
> ⚠️ Ejecutar sólo sobre entornos propios. Genera peticiones intrusivas.
```bash
docker run --rm -t zaproxy/zap-stable zap-full-scan.py \
    -t https://clinica-veterinaria.onrender.com \
    -r full-report.html
```

### Paso 3 — Escaneo autenticado (Swagger + JWT)
1. Abrir ZAP Desktop.
2. `Import` → `Import an OpenAPI definition` → URL: `https://clinica-veterinaria.onrender.com/openapi.json`.
3. Obtener token:
   ```bash
   curl -X POST https://clinica-veterinaria.onrender.com/token \
        -d "username=admin@clinica.com&password=SuperSegura123!"
   ```
4. En ZAP: `Tools` → `Options` → `Replacer` → añadir regla:
   - Match: `Header: Authorization`
   - Replacement: `Bearer <TOKEN>`
   - Enable: ✔
5. Click derecho sobre el site → `Attack` → `Active Scan`.
6. Al finalizar: `Report` → `Generate Report` → HTML.

### Paso 4 — Integración continua (opcional)
Añadir al workflow `security.yml` un job que ejecute `zaproxy/action-baseline@v0.12.0` apuntando a la URL de Render tras cada despliegue.

### Paso 5 — Interpretación de hallazgos
Clasificar por severidad OWASP Top 10 y priorizar:
- **High/Critical** → bloquear release.
- **Medium** → ticket en backlog con SLA.
- **Informational** → revisar cabeceras y endurecimiento.

---

## 🧪 Usuarios de prueba (roles RBAC)

| Rol | Capacidad |
|---|---|
| `admin`       | Acceso total |
| `veterinario` | Crear mascotas |
| `ventas`      | Crear productos |
| `clientela`   | Adoptar, ver catálogo (recibe 20% ABAC si ha adoptado) |

