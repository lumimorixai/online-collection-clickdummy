FROM nginx:stable-alpine
COPY deployment/nginx.conf /etc/nginx/nginx.conf
COPY *.html *.js *.css /srv/
COPY assets/ /srv/assets/
COPY b/ /srv/b/
COPY c/ /srv/c/
USER 10001:10001
EXPOSE 8080
HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
