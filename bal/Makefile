.PHONY: image clean
.DEFAULT: image

image: .ambergris.uptodate

.ambergris.uptodate: ambergris
	make -C ambergris
	touch $@

ambergris:
	git clone https://github.com/dpw/ambergris

clean:
	rm -rf ambergris
