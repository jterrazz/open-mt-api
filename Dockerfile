FROM node:18-alpine

WORKDIR /home

# Step 1: Install dependencies only
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install --frozen-lockfile

# Step 2: Copy application files
COPY . .
