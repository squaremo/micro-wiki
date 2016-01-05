.PHONY: all

all: preso.uptodate

preso.uptodate: Dockerfile *.js package.json
	npm install
	docker build -t squaremo/microwiki-preso .
	touch preso.uptodate
