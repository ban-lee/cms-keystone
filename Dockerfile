# https://docs.docker.com/samples/library/node/
ARG NODE_VERSION=19
# https://github.com/Yelp/dumb-init/releases
ARG DUMB_INIT_VERSION=1.2.5

# Build container
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app

ARG DUMB_INIT_VERSION

RUN apk add --no-cache build-base libc6-compat python3 yarn
RUN wget -O dumb-init -q https://github.com/Yelp/dumb-init/releases/download/v${DUMB_INIT_VERSION}/dumb-init_${DUMB_INIT_VERSION}_amd64.deb && \
    chmod +x dumb-init

RUN yarn set version 3.5.0
COPY /.yarnrc.yml package.json yarn.lock ./

RUN yarn install --immutable

# Rebuild the source code only when needed
FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
COPY . .

RUN yarn build && yarn cache clean

# Runtime container
FROM node:${NODE_VERSION}-alpine as runner
WORKDIR /app

COPY --from=build /app /app

EXPOSE 3001
CMD ["./dumb-init", "yarn", "start"]
