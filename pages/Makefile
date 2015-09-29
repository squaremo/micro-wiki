VERSION:=$(shell jq -r '.version' < ./package.json)

.PHONY: all clean

all: pages.uptodate

pages.uptodate: *.js package.json
	npm install
		docker build -t micro-wiki/pages:$(VERSION) .
	touch pages.uptodate

clean:
	rm pages.uptodate
