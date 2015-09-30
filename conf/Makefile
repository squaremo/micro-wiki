CONFS:=confd.toml haproxy.toml haproxy.cfg.tmpl
DOCKER_DISTRIB_URL=https://get.docker.com/builds/Linux/x86_64/docker-1.8.1.tgz

.PHONY: all

all: conf.uptodate

conf.uptodate: Dockerfile confd-0.10.0-linux-amd64 $(CONFS) docker.tgz
	docker build -t micro-wiki/conf .
	touch $@

confd-0.10.0-linux-amd64:
	curl -L https://github.com/kelseyhightower/confd/releases/download/v0.10.0/confd-0.10.0-linux-amd64 > $@
	chmod a+x $@

docker.tgz:
	curl -L -o $@ $(DOCKER_DISTRIB_URL)
