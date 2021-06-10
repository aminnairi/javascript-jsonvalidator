# Contributing

## Requirements

- [Git]()
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [GNU/Make](https://www.gnu.org/software/make/)

## Installation

```console
$ git clone https://github.com/aminnairi/javascript-jsonvalidator.git
$ cd javascript-jsonvalidator
```

## Dependencies installation

*Install the dependencies listed in the [`package.json`](./package.json) file.*

```console
$ make install
```

## Test

*Check that the code style remains consistent.*

```console
$ make lint
```

## Test

*Test the specification files in the [`sources`](./sources) directories.*

```console
$ make test
```

## Types

*Test that the TypeScript typings can be compiled.*

```console
$ make types
```

## Build

*Test that the project can be built.*

```console
$ make build
```

## Pack

*Check the content of the uploaded package on the NPM registry.*

```console
$ make pack
```
## Coverage

*Send coverage data to Coveralls.*

```console
$ make test coverage
```

## Publish

*Pack and publish the tarball of the package to the NPM registry.*

```console
$ make publish
```

## Clean

*Removes all files listed in the [`.gitignore`](./gitignore) file.*

```console
$ make publish
```

## npm

*Issue commands using the `npm` Docker Compose service.*

```console
$ docker-compose run --rm npm COMMAND
```

Where `COMMAND` is a `npm` command.

## NPX

*Issue commands using the `npx` service with the Docker Compose.*

```console
$ docker-compose run --rm npx COMMAND
```

Where `COMMAND` is a `npx` command.

## Node

*Issue commands using the `node` service with the Docker Compose.*

```console
$ docker-compose run --rm node COMMAND
```

Where `COMMAND` is a `node` command.
