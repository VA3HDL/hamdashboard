FROM nginx:alpine
RUN rm /usr/share/nginx/html/index.html
COPY ./hamdash.html /usr/share/nginx/html/
COPY ./wheelzoom.js /usr/share/nginx/html/
RUN mv /usr/share/nginx/html/hamdash.html /usr/share/nginx/html/index.html