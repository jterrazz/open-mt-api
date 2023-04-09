#!/bin/bash

docker compose -f scripts/docker-compose.yml run open-mt-api yarn test
