FROM debian:trixie
RUN apt update && apt install -y imagemagick git python3 python3-pygments
COPY . /tmp/site
RUN cd /tmp/site && sh ./build.sh

FROM nginx:mainline-alpine
RUN apk add curl
HEALTHCHECK --start-period=30s --start-interval=5s --interval=5m --timeout=3s \
    CMD curl --fail http://127.0.0.1:80/health || exit 1
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN sed -i 's/worker_processes *auto;/worker_processes 2;/' /etc/nginx/nginx.conf
COPY --from=0 /tmp/site/ /usr/share/nginx/html/
