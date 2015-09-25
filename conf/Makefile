CONFS:=confd.toml haproxy.toml haproxy.cfg.tmpl

.PHONY: all

all: conf.uptodate

conf.uptodate: Dockerfile confd-0.10.0-linux-amd64 $(CONFS)
	docker build -t micro-wiki/conf .
	touch $@

confd-0.10.0-linux-amd64:
	curl -L https://github.com/kelseyhightower/confd/releases/download/v0.10.0/confd-0.10.0-linux-amd64 > $@
	chmod a+x $@
