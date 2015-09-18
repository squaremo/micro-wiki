.PHONY: all

all: preso.uptodate

preso.uptodate: *.js package.json
	npm install
	docker build -t micro-wiki/preso .
	touch preso.uptodate
