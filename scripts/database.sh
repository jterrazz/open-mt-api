#!/bin/bash

. "$(dirname "$0")/.environment.sh"

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
    echo "Usage: $0 [deploy|migrate|explore]"
fi













