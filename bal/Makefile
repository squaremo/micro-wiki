.PHONY: image clean
.DEFAULT: image

image: .ambergris.uptodate

.ambergris.uptodate: ambergris
	make -C ambergris
	touch $@

ambergris:
	git clone -b build https://github.com/squaremo/ambergris

clean:
	rm -rf ambergris
