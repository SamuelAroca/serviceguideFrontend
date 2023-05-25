# Etapa de construcción
FROM node:latest AS builder

WORKDIR /app

COPY package*.json ./
COPY vite.config.js ./

RUN npm install

COPY . .

RUN npm run build

# Etapa de producción
FROM node:latest

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package*.json ./

RUN npm ci --only=production

# Establece el entorno de producción
ENV NODE_ENV=production

# Instala Vite de forma global
RUN npm install -g vite@4.3.5

EXPOSE 5173

# Ejecuta la aplicación en modo de producción
CMD ["./node_modules/.bin/vite", "build"]
