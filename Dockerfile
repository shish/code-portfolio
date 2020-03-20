FROM debian:buster
RUN apt update && apt install -y imagemagick git python3 python3-pygments
COPY . /tmp/site
RUN cd /tmp/site && sh ./build.sh

FROM nginx:mainline-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=0 /tmp/site/* /usr/share/nginx/html/
