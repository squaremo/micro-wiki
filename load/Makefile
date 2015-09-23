.PHONY: all

all: load.uptodate

load.uptodate: *.js package.json
	npm install
	docker build -t micro-wiki/load .
	touch load.uptodate
