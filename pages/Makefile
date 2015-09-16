.PHONY: all

JS_FILES=server.js db.js

all: $(JS_FILES) package.json
	npm install
	docker build -t micro-wiki/pages .
