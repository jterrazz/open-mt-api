# Open.MT - Open Market API

Welcome to the Open.MT API! Our API powers the marketplace that enables customers to discover and transact with their communities.

## About Open.MT

[Open.MT](https://open.mt) is a marketplace that enable seamless interactions between customers and their communities. We are dedicated to providing a platform that empowers merchants of all backgrounds, from big brands to small businesses and artisans. Our vision is to revolutionize the world of online commerce by leveraging the potential of decentralization and open technologies.

To learn more about our mission, latest updates, and exciting stories from entrepreneurs, visit [our blog](https://blog.open.mt/).

## Get Started 🍋

### Quick Start with Docker

Getting started with our API is simple! We use **docker** to manage the application and its dependencies. If you haven't installed Docker yet, you can follow the [official documentation](https://docs.docker.com/get-docker/) to set it up.

To launch the project, use the following command:

```sh
# Start the project
sh ./scripts/docker.sh start
```

With this quick setup, you'll be ready to explore the power of our Open Market API and build seamless experiences for customers. Happy coding!
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

