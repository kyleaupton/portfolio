# syntax=docker/dockerfile:1

# Nuxt Content uses node:sqlite, which needs Node >= 22.13 to run without flags.
ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:${NODE_VERSION}-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3001

COPY --from=build --chown=node:node /app/.output ./.output

# Nuxt Content writes its SQLite database under .data at runtime.
RUN mkdir .data && chown node:node .data

USER node

EXPOSE 3001

CMD ["node", ".output/server/index.mjs"]
