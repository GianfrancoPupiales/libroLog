# 1. Etapa de construcción
FROM node:18-alpine AS builder

# Establece directorio de trabajo
WORKDIR /app

# Copia solo los archivos de dependencias primero (para aprovechar cache)
COPY package.json package-lock.json ./
RUN npm ci

# Copia el resto del código y construye la app
COPY . .
RUN npm run build

# 2. Etapa de producción
FROM nginx:stable-alpine

# Remueve configuración default de nginx para luego copiar la nuestra
RUN rm /etc/nginx/conf.d/default.conf

# Copia un config simple de nginx
COPY ./deploy/nginx.conf /etc/nginx/conf.d/

# Copia los archivos estáticos compilados
COPY --from=builder /app/dist /usr/share/nginx/html

# Expone el puerto en el que nginx sirve
EXPOSE 80

# Arranca nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
