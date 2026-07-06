FROM nginx:mainline-alpine
RUN apk add curl
HEALTHCHECK --start-period=30s --start-interval=5s --interval=1m --timeout=3s \
    CMD curl --fail http://127.0.0.1:80/health || exit 1
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN sed -i 's/worker_processes *auto;/worker_processes 2;/' /etc/nginx/nginx.conf
COPY assets /usr/share/nginx/html/assets
COPY thumbs /usr/share/nginx/html/thumbs
COPY videos /usr/share/nginx/html/videos
COPY 404.html index.html /usr/share/nginx/html/
RUN echo ok > health
