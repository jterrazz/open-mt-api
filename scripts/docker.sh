#!/bin/bash

export ENVIRONMENT="docker"
. "$(dirname "$0")/.environment.sh"

COMPOSE_ARGUMENT="compose -f ${BASEDIR}/scripts/docker/docker-compose.yml"
HOT_RELOAD_ARGUMENT="-v "$BASEDIR/src:/home/src" -v "$BASEDIR/tests:/home/tests" -v "$BASEDIR/prisma:/home/prisma" -v "$BASEDIR/tsconfig.json:/home/tsconfig.json" -v "$BASEDIR/jest.config.ts:/home/jest.config.ts""

# Start the application
if [ "$1" = "start" ]; then
    docker $COMPOSE_ARGUMENT run open-mt-api yarn start
elif [ "$1" = "start:dev" ]; then
    docker $COMPOSE_ARGUMENT run $HOT_RELOAD_ARGUMENT open-mt-api yarn start:dev
elif [ "$1" = "start:infra" ]; then
    docker $COMPOSE_ARGUMENT up open-mt-database open-mt-migration

# Run the tests
elif [ "$1" = "test" ]; then
    docker $COMPOSE_ARGUMENT run $HOT_RELOAD_ARGUMENT open-mt-api yarn test
elif [ "$1" = "test:unit" ]; then
    docker $COMPOSE_ARGUMENT run $HOT_RELOAD_ARGUMENT open-mt-api yarn test:unit
elif [ "$1" = "test:integration" ]; then
    docker $COMPOSE_ARGUMENT run $HOT_RELOAD_ARGUMENT open-mt-api yarn test:integration

# Run the linter
elif [ "$1" = "lint" ]; then
    docker $COMPOSE_ARGUMENT run $HOT_RELOAD_ARGUMENT open-mt-api yarn lint

# Build the application

elif [ "$1" = "build" ]; then
    docker $COMPOSE_ARGUMENT run $HOT_RELOAD_ARGUMENT open-mt-api yarn build

# Print the usage
else
    echo "Usage: $0 [start|start:dev|start:infra|test|test:unit|test:integration|lint|build]"
fi
