# My Open Market - API

> A marketplace for the people by the people. Open, social and direct.

Find out more about us on [our blog](https://blog.myopen.market/) !

## Dependencies

```
node 16
yarn
docker
```

## Get started

```
# for one time start
yarn dev:docker

# for fast local development
yarn # install packages
yarn dev:docker-up
yarn dev
```


## Testing

```
# For a one time test
yarn test:docker

# For fast local development
yarn test:docker-up # start the test services
yarn test:docker-down # stop the test services

yarn test
// or for tests with detailed debug information
yarn test:debug
```

Tests running in `test` environments will create a random postgres database, migrated to the latest schema. This allows for real testing of the flow.

---
## Architecture

This project try to follow the **clean architecture** concepts.

A guide for separation of concerns:
- Move the definitions here

```
app 
 └ lib                              → Application sources 
    └ application                   → Application services layer
       └ security                   → Security tools interfaces (ex: AccessTokenManager.js, to generate and decode OAuth access token)
       └ use_cases                  → Application business rules 
    └ domain                        → Enterprise core business layer such as domain model objects (Aggregates, Entities, Value Objects) and repository interfaces
    └ infrastructure                → Frameworks, drivers and tools such as Database, the Web Framework, mailing/logging/glue code etc.
       └ config                     → Application configuration files, modules and services
          └ service-locator.js      → Module that manage service implementations by environment
       └ orm                        → Database ORMs middleware (Sequelize for SQLite3 or PostgreSQL, Mongoose for MongoDB)
          └ mongoose                → Mongoose client and schemas
          └ sequelize               → Sequelize client and models
       └ repositories               → Implementation of domain repository interfaces
       └ security                   → Security tools implementations (ex: JwtAccessTokenManager)
       └ webserver                  → Hapi.js Web server configuration (server, routes, plugins, etc.)
          └ oauth                   → Hapi.js authentication strategies and schemas
          └ server.js               → Hapi.js server definition
    └ interfaces                    → Adapters and formatters for use cases and entities to external agency such as Database or the Web
       └ controllers                → Hapi.js route handlers
       └ routes                     → Hapi.js route definitions
       └ serializers                → Converter objects that transform outside objects (ex: HTTP request payload) to inside objects (ex: Use Case request object)
 └ node_modules (generated)         → NPM dependencies
 └ test                             → Source folder for unit or functional tests
 └ index.js                         → Main application entry point
```

ADAPTERS
controller => application (use-cases) => entities
Connects the use case to the exterior. Is is like adapter / presenter / controller
=> validates the data
=> modify it for the use-case
=> thats all

This parts connects to koa,

This section can also be a presenter / gateway

APPLICATION

Use cases => Entities

(domain logic == what does the application do: example we register a student to our app)
Can communicate to the higher levels (DB, repositories, web) only by using interfaces.
The implementations are injected only after !!!

ENTITIES

Entities => nothing
This layer is independent, which means that you will not see any “require (‘…’)” in the entity’s JS files.
This layer wouldn’t be affected by external changes like routing or controllers.

INFRASTRUCTURE
cf https://github.com/jbuget/nodejs-clean-architecture-app/tree/master/lib/infrastructure

This is the infrastructure folder. Contains the details of the behaviors

"This layer is where all the details go. The web is a detail. The database is a detail. We keep these things on the outside where they can do little harm"

## My Open Market Wiki

My Open Market is an application that enable open, social and direct interactions between merchants and clients.

[<img align="left" alt="website" src="https://img.shields.io/badge/website-%2305A8AA.svg?&style=for-the-badge&logo=safari&logoColor=white" />](https://jterrazz.com)

[<img align="left" alt="medium" src="https://img.shields.io/badge/blog-%23353535.svg?&style=for-the-badge&logo=medium&logoColor=white" />](https://blog.jterrazz.com)

[<img align="left" alt="github" src="https://img.shields.io/badge/github-%23284B63.svg?&style=for-the-badge&logo=github&logoColor=white" />](https://github.com/myonewallet)

