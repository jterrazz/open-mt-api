#!/bin/bash

export ENVIRONMENT="docker"
. "$(dirname "$0")/.environment.sh"

# Start the application
if [ "$1" = "start" ]; then
    docker compose -f "${BASEDIR}/scripts/docker/docker-compose.yml" run open-mt-api yarn start
elif [ "$1" = "dev" ]; then
    docker compose -f "${BASEDIR}/scripts/docker/docker-compose.yml" run -v "$BASEDIR/src:/home/src" -v "$BASEDIR/tests:/home/tests" open-mt-api yarn start:dev

# Run the tests
elif [ "$1" = "test" ]; then
    docker compose -f "${BASEDIR}/scripts/docker/docker-compose.yml" run open-mt-api yarn test

# Start the external services
elif [ "$1" = "services" ]; then
    docker compose -f "${BASEDIR}/scripts/docker/docker-compose.yml" up open-mt-database open-mt-migration

# Print the usage
else
    echo "Usage: $0 [start|dev|test|services]"
fi
