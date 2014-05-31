all: build

build:
	ember build --environment=production
	rm -rf ../public
	mv dist ../public
	rm -rf ../public/api
	rm -rf ../public/fuel
	rm -rf ../public/ipm00
