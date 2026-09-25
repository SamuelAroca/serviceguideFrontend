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
