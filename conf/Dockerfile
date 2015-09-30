FROM gliderlabs/alpine:latest
ENTRYPOINT ["/usr/local/bin/confd"]
COPY ./confd-0.10.0-linux-amd64 /usr/local/bin/confd
COPY ./confd.toml /etc/confd/
COPY ./haproxy.toml /etc/confd/conf.d/
ADD ./docker.tgz /
#COPY ./haproxy.cfg.tmpl /etc/confd/templates/
VOLUME /var/run/haproxy
