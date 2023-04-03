# https://docs.docker.com/samples/library/node/
ARG NODE_VERSION=19

# Build container
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN yarn set version 3.5.0
COPY /.yarnrc.yml package.json yarn.lock ./

RUN yarn install --immutable

# Rebuild the source code only when needed
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
COPY . .

ARG SESSION_SECRET
ARG CLOUDINARY_NAME
ARG CLOUDINARY_KEY
ARG CLOUDINARY_SECRET

RUN yarn build && yarn cache clean

# Runtime container
FROM node:${NODE_VERSION}-alpine as runner
WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3001
CMD ["yarn", "start"]
