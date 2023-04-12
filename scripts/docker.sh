#!/bin/bash

export ENVIRONMENT="docker"
. "$(dirname "$0")/.environment.sh"

HOT_RELOAD_ARGUMENT="-v "$BASEDIR/src:/home/src" -v "$BASEDIR/tests:/home/tests" -v "$BASEDIR/prisma:/home/prisma" -v "$BASEDIR/tsconfig.json:/home/tsconfig.json" -v "$BASEDIR/jest.config.ts:/home/jest.config.ts""

# Start the application
if [ "$1" = "start" ]; then
    docker compose -f "${BASEDIR}/scripts/docker/docker-compose.yml" run open-mt-api yarn start
elif [ "$1" = "start:dev" ]; then
    docker compose -f "${BASEDIR}/scripts/docker/docker-compose.yml" run $HOT_RELOAD_ARGUMENT open-mt-api yarn start:dev

# Run the tests
elif [ "$1" = "test" ]; then
    docker compose -f "${BASEDIR}/scripts/docker/docker-compose.yml" run $HOT_RELOAD_ARGUMENT open-mt-api yarn test

# Start the external services
elif [ "$1" = "services" ]; then
    docker compose -f "${BASEDIR}/scripts/docker/docker-compose.yml" up open-mt-database open-mt-migration

# Print the usage
else
    echo "Usage: $0 [start|dev|test|services]"
fi
