FROM nginx:stable-alpine AS runtime

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY index.html styles.css app.js ./
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
