-- =========================================================
-- APARTADO: MODELOS DE DATOS Y SUPABASE (DDL)
-- Ejecutar en el editor SQL de Supabase antes del primer arranque.
-- =========================================================

create table if not exists usuarios (
    id bigserial primary key,
    email text unique not null,
    hashed_password text not null,
    role text not null default 'clientela'
        check (role in ('admin','clientela','veterinario','ventas')),
    has_adopted_pet boolean not null default false,
    created_at timestamptz default now()
);

create table if not exists mascotas (
    id bigserial primary key,
    nombre text not null,
    especie text not null,
    edad int not null default 0,
    is_adopted boolean not null default false
);

create table if not exists adopciones (
    id bigserial primary key,
    usuario_id bigint references usuarios(id) on delete cascade,
    mascota_id bigint references mascotas(id) on delete cascade,
    fecha timestamptz default now()
);

create table if not exists tienda (
    id bigserial primary key,
    nombre text not null,
    descripcion text,
    precio numeric(10,2) not null check (precio >= 0),
    imagen_url text
);

-- RLS (Row Level Security) recomendado en Supabase:
alter table usuarios enable row level security;
alter table mascotas enable row level security;
alter table adopciones enable row level security;
alter table tienda enable row level security;
