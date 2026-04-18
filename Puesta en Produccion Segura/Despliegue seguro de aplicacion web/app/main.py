# =========================================================
# CLÍNICA VETERINARIA - APLICACIÓN FASTAPI + SUPABASE
# Autor: Juan Pérez Ortega
# Descripción: Aplicación web minimalista que integra
# OAuth2/JWT, RBAC, ABAC y conexión con Supabase.
# =========================================================

import os
from datetime import datetime, timedelta
from typing import Optional, List

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import HTMLResponse
from pydantic import BaseModel, EmailStr
from jose import JWTError, jwt
from passlib.context import CryptContext
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Clínica Veterinaria API", version="1.0.0")


# ########## APARTADO: GESTIÓN DE SECRETOS (carga runtime) ##########
# Toda credencial se obtiene desde variables de entorno (.env / Render Secrets).
# Nunca se hardcodean claves — cumplimiento OWASP A02:2021 Cryptographic Failures.
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")
JWT_SECRET = os.getenv("JWT_SECRET", "change-me-in-production")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", "30"))

supabase: Optional[Client] = None
if SUPABASE_URL and SUPABASE_KEY:
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


# ########## APARTADO: MODELOS DE DATOS Y SUPABASE ##########
# Modelos Pydantic que reflejan las tablas en Supabase.
# Tablas SQL esperadas en Supabase (ver schema.sql):
#   - usuarios(id, email, hashed_password, role, has_adopted_pet)
#   - mascotas(id, nombre, especie, edad, is_adopted)
#   - adopciones(id, usuario_id, mascota_id, fecha)
#   - tienda(id, nombre, descripcion, precio, imagen_url)

class Usuario(BaseModel):
    """Representa a un usuario del sistema. Campo `role` soporta RBAC
    y `has_adopted_pet` es el atributo clave para la decisión ABAC."""
    id: Optional[int] = None
    email: EmailStr
    role: str = "clientela"  # admin | clientela | veterinario | ventas
    has_adopted_pet: bool = False


class UsuarioCreate(BaseModel):
    email: EmailStr
    password: str
    role: str = "clientela"


class Mascota(BaseModel):
    """Mascota disponible en la clínica. is_adopted marca estado de adopción."""
    id: Optional[int] = None
    nombre: str
    especie: str
    edad: int
    is_adopted: bool = False


class Adopcion(BaseModel):
    """Registro de adopción — vincula usuario con mascota."""
    id: Optional[int] = None
    usuario_id: int
    mascota_id: int
    fecha: Optional[datetime] = None


class Producto(BaseModel):
    """Producto de la tienda veterinaria."""
    id: Optional[int] = None
    nombre: str
    descripcion: str
    precio: float
    imagen_url: Optional[str] = None


class Token(BaseModel):
    access_token: str
    token_type: str


# ########## APARTADO: AUTENTICACIÓN OAUTH 2 ##########
# Implementa flujo OAuth2 Password Bearer + emisión de JWT firmados (HS256).
# Complementa / se integra con Supabase Auth: el backend valida credenciales
# contra la tabla `usuarios` de Supabase y firma su propio JWT para las rutas.

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain: str, hashed: str) -> bool:
    """Verifica contraseña contra hash bcrypt (defensa frente a rainbow tables)."""
    return pwd_context.verify(plain, hashed)


def hash_password(password: str) -> str:
    """Hashea contraseña con bcrypt antes de persistirla en Supabase."""
    return pwd_context.hash(password)


def create_access_token(data: dict) -> str:
    """Genera un JWT firmado con expiración — núcleo del flujo OAuth2."""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=JWT_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)


async def get_user_from_db(email: str) -> Optional[dict]:
    """Consulta a Supabase el usuario por email (integración Supabase Auth)."""
    if not supabase:
        # Fallback demo — evita fallo si Supabase no está configurado.
        return {"id": 1, "email": email,
                "hashed_password": hash_password("demo1234"),
                "role": "clientela", "has_adopted_pet": False}
    res = supabase.table("usuarios").select("*").eq("email", email).execute()
    return res.data[0] if res.data else None


async def get_current_user(token: str = Depends(oauth2_scheme)) -> Usuario:
    """Decodifica el JWT y recupera el usuario autenticado.
    Aplica validación de firma + expiración — base de toda autorización posterior."""
    credentials_exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciales inválidas",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exc
    except JWTError:
        raise credentials_exc
    user = await get_user_from_db(email)
    if user is None:
        raise credentials_exc
    return Usuario(**user)


@app.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Endpoint OAuth2: recibe username/password, devuelve JWT.
    Compatible con el flujo `password` del estándar OAuth2 (RFC 6749)."""
    user = await get_user_from_db(form_data.username)
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Usuario o contraseña incorrectos")
    token = create_access_token({"sub": user["email"], "role": user["role"]})
    return {"access_token": token, "token_type": "bearer"}


@app.post("/register")
async def register(data: UsuarioCreate):
    """Registro de usuarios — guarda bcrypt hash en Supabase."""
    if not supabase:
        raise HTTPException(503, "Supabase no configurado")
    hashed = hash_password(data.password)
    supabase.table("usuarios").insert({
        "email": data.email, "hashed_password": hashed,
        "role": data.role, "has_adopted_pet": False
    }).execute()
    return {"msg": "Usuario creado"}


# ########## APARTADO: GESTIÓN DE AUTORIZACIÓN RBAC ##########
# Control de acceso basado en roles. Cada endpoint declara los roles que puede
# acceder vía dependencia `require_roles` — principio de mínimo privilegio.

ALLOWED_ROLES = {"admin", "clientela", "veterinario", "ventas"}


def require_roles(*roles: str):
    """Factory de dependencia: exige que el usuario tenga uno de los roles dados."""
    async def checker(user: Usuario = Depends(get_current_user)) -> Usuario:
        if user.role not in roles:
            raise HTTPException(403, f"Rol '{user.role}' no autorizado. Se requiere: {roles}")
        return user
    return checker


@app.get("/admin/usuarios", response_model=List[Usuario])
async def listar_usuarios(_: Usuario = Depends(require_roles("admin"))):
    """Solo admin puede listar usuarios — RBAC estricto."""
    if not supabase:
        return []
    res = supabase.table("usuarios").select("id,email,role,has_adopted_pet").execute()
    return res.data


@app.post("/mascotas", response_model=Mascota)
async def crear_mascota(m: Mascota,
                        _: Usuario = Depends(require_roles("admin", "veterinario"))):
    """Alta de mascota — restringida a admin y veterinario."""
    if not supabase:
        return m
    res = supabase.table("mascotas").insert(m.dict(exclude={"id"})).execute()
    return res.data[0]


@app.get("/mascotas", response_model=List[Mascota])
async def listar_mascotas(_: Usuario = Depends(get_current_user)):
    """Cualquier usuario autenticado puede consultar mascotas."""
    if not supabase:
        return []
    res = supabase.table("mascotas").select("*").execute()
    return res.data


@app.post("/adopciones")
async def adoptar(mascota_id: int,
                  user: Usuario = Depends(require_roles("clientela", "admin"))):
    """Clientela (o admin) pueden adoptar. Marca mascota y usuario."""
    if not supabase:
        return {"msg": "adopción simulada"}
    supabase.table("adopciones").insert({
        "usuario_id": user.id, "mascota_id": mascota_id,
        "fecha": datetime.utcnow().isoformat()
    }).execute()
    supabase.table("mascotas").update({"is_adopted": True}).eq("id", mascota_id).execute()
    supabase.table("usuarios").update({"has_adopted_pet": True}).eq("id", user.id).execute()
    return {"msg": "Adopción registrada"}


@app.post("/tienda/productos", response_model=Producto)
async def crear_producto(p: Producto,
                         _: Usuario = Depends(require_roles("admin", "ventas"))):
    """Alta de productos — restringida al rol ventas y admin."""
    if not supabase:
        return p
    res = supabase.table("tienda").insert(p.dict(exclude={"id"})).execute()
    return res.data[0]


# ########## APARTADO: GESTIÓN DE AUTORIZACIÓN ABAC ##########
# Control basado en atributos: regla de negocio que NO depende del rol sino
# del atributo `has_adopted_pet` del usuario.
# Regla: si user.has_adopted_pet == True → 20% descuento en precio final.

def aplicar_descuento_abac(precio: float, user: Usuario) -> float:
    """Motor de decisión ABAC: evalúa el atributo del sujeto y devuelve el precio final."""
    if user.has_adopted_pet:
        return round(precio * 0.80, 2)
    return precio


@app.get("/tienda/productos")
async def listar_productos(user: Usuario = Depends(get_current_user)):
    """Devuelve el catálogo con el precio ajustado por la política ABAC."""
    # Catálogo base (si no hay Supabase configurado se sirve uno local).
    productos_base = [
        {"id": 1, "nombre": "Collar antipulgas", "descripcion": "Protección 6 meses",
         "precio": 19.99, "imagen_url": None},
        {"id": 2, "nombre": "Pienso premium 5kg", "descripcion": "Alimento balanceado",
         "precio": 34.50, "imagen_url": None},
        {"id": 3, "nombre": "Vacuna polivalente", "descripcion": "Vacunación anual",
         "precio": 45.00, "imagen_url": None},
    ]
    if supabase:
        res = supabase.table("tienda").select("*").execute()
        if res.data:
            productos_base = res.data

    # Aplicación de la política ABAC sobre cada producto.
    resultado = []
    for p in productos_base:
        precio_final = aplicar_descuento_abac(p["precio"], user)
        resultado.append({
            **p,
            "precio_original": p["precio"],
            "precio_final": precio_final,
            "descuento_abac_aplicado": user.has_adopted_pet,
        })
    return resultado


# ---------------------------------------------------------
# Landing mínima con referencia al huevo de pascua.
# ---------------------------------------------------------
@app.get("/", response_class=HTMLResponse)
async def root():
    return """
    <h1>Clínica Veterinaria</h1>
    <p>API de gestión con OAuth2, RBAC y ABAC.</p>
    <p>Consulta <a href="/docs">/docs</a> para Swagger UI.</p>
    """


@app.get("/health")
async def health():
    """Endpoint para healthcheck de Render."""
    return {"status": "ok", "supabase": bool(supabase)}
