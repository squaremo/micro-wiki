.PHONY: all clean

all: pages.uptodate

pages.uptodate: *.js package.json Dockerfile
	npm install
	docker build -t squaremo/microwiki-pages .
	touch pages.uptodate

clean:
	rm pages.uptodate
