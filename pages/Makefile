.PHONY: all

all: pages.uptodate

pages.uptodate: *.js package.json
	npm install
	docker build -t micro-wiki/pages .
	touch pages.uptodate
