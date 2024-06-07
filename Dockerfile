FROM node:22-alpine as builder

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps

RUN npm run generate

FROM nginx:latest

COPY --from=builder /app/dist  /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
