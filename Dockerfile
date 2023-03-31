FROM node:16

# Step 1: Install dependencies only
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install --frozen-lockfile

# Step 2: Copy application files
COPY . .

# Step 3: Generate database client
RUN npx database generate
