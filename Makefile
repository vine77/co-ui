all: build 

build:
	ember build
	rm -rf ../public
	mv dist ../public
