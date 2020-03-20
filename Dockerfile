FROM nginx:mainline
RUN apt update && apt install -y python3-pygments imagemagick
COPY nginx.conf /etc/nginx/nginx.conf
COPY . /usr/share/nginx/html
RUN cd /usr/share/nginx/html && sh ./build.sh
