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
sh ./scripts/docker.sh start:infra
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

--- 

[***Open.MT - Wiki***](https://github.com/jterrazz/app.open-mt)

