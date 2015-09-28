.PHONY: all

all: preso.uptodate

preso.uptodate: Dockerfile *.js package.json
	npm install
	docker build -t micro-wiki/preso .
	touch preso.uptodate
