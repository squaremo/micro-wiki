.PHONY: all

all: load.uptodate

load.uptodate: *.js package.json Dockerfile
	npm install
	docker build -t micro-wiki/load .
	touch load.uptodate
