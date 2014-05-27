all: build 

build:
	ember build
	rm -rf ../public
	mv dist ../public
	rm -rf ../public/api
	rm -rf ../public/fuel
	rm -rf ../public/ipm00
