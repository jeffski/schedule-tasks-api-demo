# Shedules and Tasks Demo Project

A simple demo application using Nest.js and Prisma

## Run using Docker

To run and test the project with Docker run:

```
docker-compose up -d --build
```

TODO: Use Prisma to migrate/create database tables

## Development

Install dependencies locally so that IDE can find required modules:

```bash
make modules
```

Install new modules:

```bash
make add <module-name>
```

Replace <module-name> with the name of the NPM node module.

## Run tests

Unit tests:

```bash
make test
```

