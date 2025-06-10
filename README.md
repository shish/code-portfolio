```
docker build . && docker run --rm -ti -p 4220:80 $(docker build -q .)
```
