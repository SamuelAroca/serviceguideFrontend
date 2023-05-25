# Etapa de construcción
FROM node:18 as build

WORKDIR /app

COPY package.json ./

COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d/*

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5002

CMD ["nginx","-g","daemon off;"]