# Nestjs Example

## Description

Follow the steps as instructed by Francesco Ciulla: [TypeScript CRUD Rest API, using Nest.js, TypeORM, Postgres, Docker and Docker Compose](https://dev.to/francescoxx/typescript-crud-rest-api-using-nestjs-typeorm-postgres-docker-and-docker-compose-33al)

### Create a CRUD Rest API in Typescript, using:
- NestJS (NodeJS framework)
- TypeORM (ORM: Object Relational Mapper)
- Postgres (relational database)
- Docker (for containerization)
- Docker Compose

## Requirements:
- Node installed (I'm using v16)
- Docker installed and running
- NestJS CLI (command below)
- (Optional): Postman and DBeaver to follow along, but any testing tool will work

## Installation

```bash
$ npm install
```

## Run the Postgres service

```bash
# This will run the db service in detached mode.
$ docker compose up -d db

# Check if the service is running
$ docker ps -a
```

## Build the Nest app image

```bash
# This will build the image from the Dockerfile.
$ docker compose build
```

## Run the Nest app service

```bash
# Run the Nest app service
$ docker compose up
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Van Nhan](https://nhanhovan.github.io/NhanHoVan/)

## License

Nest is [MIT licensed](LICENSE).
