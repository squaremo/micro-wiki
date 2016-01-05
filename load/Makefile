.PHONY: all

all: load.uptodate

load.uptodate: *.js package.json Dockerfile
	npm install
	docker build -t squaremo/microwiki-load .
	touch load.uptodate
