#!/bin/bash

source "$(dirname "$0")/.common.sh"

# Starts the API
if [ "$1" = "start" ]; then
    docker compose -f "${BASEDIR}/docker/docker-compose.yml" run open-mt-api yarn start
elif [ "$1" = "dev" ]; then
    docker compose -f "${BASEDIR}/docker/docker-compose.yml" run open-mt-api yarn start:dev

# Runs the tests
elif [ "$1" = "test" ]; then
    docker compose -f "${BASEDIR}/docker/docker-compose.yml" run open-mt-api yarn test

# Starts the required services
elif [ "$1" = "services" ]; then
    docker compose -f "${BASEDIR}/docker/docker-compose.yml" up open-mt-database
    source "$(dirname "$0")/database.sh" deploy --docker-network

# Prints the usage
else
    echo "Usage: $0 [start|dev|test|services]"
fi
