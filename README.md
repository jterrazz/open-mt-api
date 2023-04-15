# Open.MT - Open Market API

> [Open.MT](https://open.mt) is a marketplace that allows customers to discover and transact with their communities.

Learn more about us on [our blog](https://blog.open.mt/) !

## Get started 🍋

### Quick start with Docker

This project is using **docker** to run the application and its dependencies. If you don't have it installed, you can follow the [official documentation](https://docs.docker.com/get-docker/).

```sh
# Start the project
sh ./scripts/docker.sh start
```

To help you **develop**, we provide a few scripts to run the project with hot reload, and run tests.

```sh
# Develop the project with hot reload
sh ./scripts/docker.sh start:dev

# Run tests
sh ./scripts/docker.sh test
```

### Quick start with Node.js

If you want to run the project locally, you will need to install the following dependencies:
- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install)

Since this project requires external services (database, etc), you will need to run them manually.

```sh
sh ./scripts/docker.sh services
```

#### Start the project

```sh
# Install dependencies
yarn

# Start the project
yarn start

# Develop the project with hot reload
yarn start:dev
```

#### Run tests

```sh
yarn test
```

## Code quality 🏗

### Tests

The **`jest` framework** is used to run both **integration** (`/tests/e2e/*.test.ts`) and **unit** tests (`__tests__/*.test.ts`).
The tests are run on **Github Actions** on each push.

### Linting

The **`eslint` framework** is used to lint the code. The rules are defined in the `.eslintrc` file.

### Architecture

It follows this structure:

```bash
<root>
└ compose # docker compose configuration
└ values # configuration values
└ database # database schema
└ src # the application
└ tests # integrations tests
```

### App VS worker
...

### Clean architecture

The project follows **clean architecture** concepts.
Because of that, we benefit from a better separation of concerns:
the application is developed on solid abstracted interfaces and methods, and the technical implementation of this code is pushed to the side of the project.

#### The clean architecture structure

```bash
src
└ adapters
  # links the application to the external world
└ application
  # the abstracted use cases of the application
└ configuration
  # injects dependencies (server implementations) to the abstracted application
└ domain
  # core objects of the application
└ infrastructure
  # server implementations
```

##### 1. Adapters

It links the abstracted application to the external world. They can be of multiple types:
- presenter (for frontend applications) - App
- controllers (links an HTTP library to its handlers for example) - App
- middlewares (intermediate steps of an HTTP library) - App
- consumers - Worker

Its role is only to receive and validate the received data, format the output, and orchestrate the calls to use cases. That's all.

For example here, we connect the `koa` controllers and middlewares to our abstracted application.

##### 2. Api

The base of the applications is at the `contracts` level.
These contracts represent abstract methods of the higher levels of the application (database, external services, etc). Meaning that the implementations are never found here, but are injected at the application runtime.
The `use-cases` section will describe the behaviour of what our application can concretely do.

For example, we can:
- Register a user
- Get the details of a user
- Add a product to a shop

So it can communicate to the higher levels (DB, repositories, web) only by using interfaces.
The implementations are injected at the runtime. It can only create this logic based on the injected interfaces, and it can require the lower level: the domain.

##### 3. Domain
This layer is independent, you will never see any “require (‘…’)” to another part of the application
This layer is not be affected by external changes like routing or controllers.

##### 4. Infrastructure
This is the technical implementation of our application contracts.

> "This layer is where all the details go. The web is a detail. The database is a detail. We keep these things on the outside where they can do little harm"

##### ℹ️ The injection flow

```sh
infrastructure <=> configuration/injector.ts
                                  <=> adapters
                                      <=> application
                                          <=> domain
```

--- 

[***Open.MT - Wiki***](https://github.com/jterrazz/app.open-mt)

