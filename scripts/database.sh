#!/bin/bash

source "$(dirname "$0")/.common.sh"

if [ "$2" = "--docker-network" ]; then
    echo "Using settings for the docker network"
else
    echo "Using settings for the localhost network"
    DATABASE_URL="${DATABASE_URL//${DATABASE_HOST}/localhost}"
fi


# Manage the database
if [ "$1" = "deploy" ]; then
    npx prisma migrate deploy
elif [ "$1" = "migrate" ]; then
    read -r -p 'Migration name: ' migrationName
    npx prisma migrate dev --name "$migrationName"

# Explore the database
elif [ "$1" = "explore" ]; then
    npx prisma studio

# Prints the usage
else
    echo "Usage: $0 [deploy|migrate|explore] [--docker-network]"
fi













