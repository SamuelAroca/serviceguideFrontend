# Hardening del deploy casero (LAN)

Dos cosas sueltas que no dependen de código de la app, para correr una
vez en el servidor (`root@openmediavault` o donde corran los contenedores).

## 1. HTTPS entre tu red y la app (Caddy)

Ahora mismo el front (`5002`) y el back (`5001`) responden en HTTP plano:
el login y el JWT viajan sin cifrar dentro de tu LAN. `deploy/reverse-proxy/`
trae un Caddy que sirve todo por HTTPS con un certificado propio (Caddy
trae su propia CA interna — no hace falta pagar ni configurar nada, y
funciona para IPs privadas, donde Let's Encrypt no serviría).

Pasos, en el server:

1. **Copiar los archivos.** `deploy/reverse-proxy/Caddyfile` y
   `deploy/reverse-proxy/docker-compose.yml` a cualquier carpeta del
   servidor (ej. `/opt/serviceguide-proxy/`). Si tu servidor no es
   `192.168.1.22`, editá esa IP en el `Caddyfile` antes de levantarlo.

2. **Levantar el proxy:**
   ```bash
   cd /opt/serviceguide-proxy
   docker compose up -d
   ```

3. **Meter frontend y backend en la misma red del proxy** (ya viene
   declarado en los `docker-compose.yml` de ambos repos desde este commit,
   solo falta recrear los contenedores para que tome efecto):
   ```bash
   cd /ruta/a/serviceguideFrontend && docker compose up -d --force-recreate
   cd /ruta/a/serviceguideBackend && docker compose up -d --force-recreate
   ```

4. **Actualizar el `.env` del frontend** para que apunte al proxy (mismo
   origen para todo, vía `/api/*`) y **reconstruir** (Vite hornea estas
   variables en build time):
   ```bash
   VITE_API_AUTH=https://192.168.1.22/api/users/auth
   VITE_API_USER=https://192.168.1.22/api/users
   VITE_API_HOUSE=https://192.168.1.22/api/house
   VITE_API_RECEIPT=https://192.168.1.22/api/receipt
   VITE_API_CITY=https://192.168.1.22/api/cities
   VITE_API_STATISTIC=https://192.168.1.22/api/statistic
   VITE_API_EMAIL=https://192.168.1.22/api/email
   ```
   ```bash
   cd /ruta/a/serviceguideFrontend && docker compose up -d --build
   ```

5. **Actualizar `front.URL` en `secrets.properties` del backend** (usado
   por el CORS) a `https://192.168.1.22`, y reiniciar el contenedor
   (no hace falta rebuild, es una property leída en runtime):
   ```bash
   cd /ruta/a/serviceguideBackend && docker compose up -d --force-recreate
   ```

6. **Entrar por `https://192.168.1.22`** (ya no por `:5002`). El navegador
   va a marcar "no seguro" la primera vez porque la CA de Caddy no es una
   CA pública — es esperado. Para que deje de avisar, sacá su root cert
   del volumen y confiá en él en tu PC/celular:
   ```bash
   docker cp ServiceGuideProxy:/data/caddy/pki/authorities/local/root.crt ./caddy-root.crt
   ```
   (En Windows: doble clic → Instalar certificado → Máquina local →
   Entidades de certificación raíz de confianza. En Android/iOS: instalar
   como perfil de confianza en Ajustes.) Es opcional — el cifrado funciona
   igual sin este paso, solo queda la advertencia del navegador.

7. **Opcional, una vez confirmes que todo funciona por HTTPS:** quitá los
   `ports: 5002:5002` / `5001:5001` de los `docker-compose.yml` de front y
   back para que SOLO se pueda entrar por Caddy (443), no por HTTP directo.
   No lo hagas hasta confirmar el paso 6, para no quedarte sin acceso si
   algo del proxy falla.

## 2. Restringir quién puede conectarse a Postgres

`pg_hba.conf` hoy acepta cualquier IP con la contraseña correcta
(`host all all all scram-sha-256`). Mientras el puerto 5432 no esté
expuesto a internet no es explotable desde afuera, pero es una sola capa
de defensa. Acotarlo a tu LAN y a la red interna de Docker:

1. **Ver la subred de la red de Docker que usa el backend:**
   ```bash
   docker network inspect serviceguide-postgres_default --format '{{range .IPAM.Config}}{{.Subnet}}{{end}}'
   ```
   (te va a dar algo como `172.20.0.0/16`, según lo que ya vimos en
   `iptables`).

2. **Editar `pg_hba.conf` dentro del contenedor** (cambiá `172.20.0.0/16`
   por lo que te haya dado el comando anterior):
   ```bash
   docker exec -it ServiceGuidePostgres bash -c "
   sed -i '/host all all all scram-sha-256/d' /var/lib/postgresql/data/pg_hba.conf
   cat >> /var/lib/postgresql/data/pg_hba.conf <<'EOF'
   host    all             all             192.168.1.0/24          scram-sha-256
   host    all             all             172.20.0.0/16           scram-sha-256
   EOF
   "
   ```

3. **Recargar sin reiniciar el contenedor** (pg_hba.conf no necesita
   restart, solo reload):
   ```bash
   docker exec -it ServiceGuidePostgres psql -U serviceguide -d serviceguide_db -c "SELECT pg_reload_conf();"
   ```

4. **Confirmar que sigue conectando** desde pgAdmin/DBeaver en tu red y
   que el backend sigue funcionando normal (usa la subred de Docker, no
   tu LAN, para conectarse a la DB).
