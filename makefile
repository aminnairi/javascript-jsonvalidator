# Copyright © 2021 Amin NAIRI
# Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
# The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
# THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

.PHONY: install test build types pack coverage publish lint clean

DOCKER_COMPOSE_RUN_OPTIONS=--rm

ifeq (${CI},true)
	DOCKER_COMPOSE_RUN_OPTIONS=--rm --user root -T
endif

install:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) npm install

test:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) npm run test

build:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) npm run build

types:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) npm run types

publish:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) npm publish --access public || true

pack:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) npm pack --dry-run

coverage:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) npm run coverage

lint:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) npm run lint

clean:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) bash -c 'for file in $(shell cat .gitignore); do rm -rf $${file:1}; done'
