.PHONY: image clean
.DEFAULT: image

image: .weevil.uptodate

.weevil.uptodate: weevil
	make -C weevil

weevil:
	git clone https://github.com/squaremo/weevil.git

clean:
	rm -rf weevil
