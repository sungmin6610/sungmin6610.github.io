.PHONY: setup serve build clean

setup:
	bin/bootstrap

serve:
	bin/start

build:
	bin/build

clean:
	bundle exec jekyll clean
