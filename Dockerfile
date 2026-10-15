FROM caddy:2-alpine
COPY deployment/Caddyfile.internal /etc/caddy/Caddyfile
COPY *.html *.js *.css /srv/
COPY assets/ /srv/assets/
COPY b/ /srv/b/
COPY c/ /srv/c/
ENV XDG_CONFIG_HOME=/tmp/config XDG_DATA_HOME=/tmp/data
USER 10001:10001
EXPOSE 8080
HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
