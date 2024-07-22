# Nestjs Example

## Description

Follow the steps as instructed by Francesco Ciulla: [TypeScript CRUD Rest API, using Nest.js, TypeORM, Postgres, Docker and Docker Compose](https://dev.to/francescoxx/typescript-crud-rest-api-using-nestjs-typeorm-postgres-docker-and-docker-compose-33al)

### Create a Manage User project, using:
- NestJS (NodeJS framework)
- Typescript
- TypeORM (ORM: Object Relational Mapper)
- Postgres (relational database)
- Docker (for containerization)
- Docker Compose
- Firebase Auth

## Requirements:
- Node installed (I'm using v16)
- Docker installed and running
- NestJS CLI (command below)
- (Optional): Postman and DBeaver to follow along, but any testing tool will work

## Installation

```bash
$ npm install
```

## ENV

```bash
API_PORT=3000
PG_PORT=5432
PG_HOST=localhost
PG_USER=postgres
PG_PASSWORD=postgres
PG_DB=postgres
DB_TYPE=postgres
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
NODE_ENV=
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

## Migration

```bash
# Create a new migration for TypeORM
$ docker-compose exec nestapp npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate src/db/migration/AddUsersAndOrganizationTable -d src/db/ormconfig.ts

# Run migration
$ docker-compose exec nestapp npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d src/db/ormconfig.ts
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Van Nhan](https://nhanhovan.github.io/NhanHoVan/)

## License

Nest is [MIT licensed](LICENSE).
