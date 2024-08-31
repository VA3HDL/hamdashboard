FROM nginx:alpine
COPY . /usr/share/nginx/html
RUN rm /usr/share/nginx/html/index.html
RUN mv /usr/share/nginx/html/hamdash.html /usr/share/nginx/html/index.html