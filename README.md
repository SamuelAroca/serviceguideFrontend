# ServiceGuide Frontend

Frontend de ServiceGuide: gestión y visualización del consumo de servicios públicos (agua, energía, gas, alcantarillado) por casa/usuario. React + Vite.

## Requisitos

- Node.js 18+
- Un backend de ServiceGuide corriendo (o accesible) con los microservicios que consume la app.

## Configuración

Copia `.env.example` a `.env` y completa cada URL con la del microservicio correspondiente:

```bash
cp .env.example .env
```

| Variable | Microservicio |
|---|---|
| `VITE_API_AUTH` | Autenticación (login, registro, logout) |
| `VITE_API_USER` | Datos y ajustes del usuario |
| `VITE_API_HOUSE` | Casas del usuario |
| `VITE_API_RECEIPT` | Recibos/facturas de servicios |
| `VITE_API_CITY` | Catálogo de ciudades |
| `VITE_API_STATISTIC` | Estadísticas y gráficas de consumo |
| `VITE_API_EMAIL` | Recuperación/cambio de contraseña por correo |

Sin estas variables las peticiones fallan en silencio contra `"undefined/..."`.

## Desarrollo

```bash
npm install
npm run dev
```

Levanta el servidor de desarrollo en `http://localhost:5002`.

## Build

```bash
npm run build    # genera dist/
npm run preview  # sirve el build de dist/ localmente
```

## Docker

```bash
docker compose up --build
```

Build multi-stage (Node para compilar, nginx para servir `dist/`), expuesto en el puerto `5002` (ver `Dockerfile`, `docker-compose.yml` y `ngnix/nginx.conf`).

**Importante:** el `.env` debe existir en este directorio *antes* de correr `docker compose up --build`, con la IP/host real donde quede expuesto el backend (no `localhost`, salvo que backend y frontend corran en el mismo host). Vite hornea las `VITE_API_*` en el bundle durante el build (`npm run build`, que corre dentro de la imagen); si el `.env` no estaba ahí en ese momento, o cambiaste sus valores despues de la ultima imagen construida, hay que reconstruir con `--build` para que tome efecto — un `docker compose up` sin `--build` reusa la imagen vieja con los valores horneados anteriores.

### Deploy en producción/LAN: HTTPS y hardening de red

Por defecto todo corre en HTTP plano. Si esto se despliega fuera de un
entorno de pruebas (aunque sea una LAN casera), ver [`deploy/README.md`](deploy/README.md)
para poner un reverse proxy con HTTPS (Caddy, certificado propio, sin
costo) delante de front y back, y para restringir el acceso a Postgres
a redes conocidas en vez de aceptar cualquier IP.
