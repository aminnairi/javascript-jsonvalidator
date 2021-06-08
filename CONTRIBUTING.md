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

*Test the specification files in the [`sources`](./sources) directories*

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
