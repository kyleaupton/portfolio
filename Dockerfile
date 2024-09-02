# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.17.0

FROM node:${NODE_VERSION}-alpine

# Set working directory for all build stages.
WORKDIR /usr/src/app

# Update and install dependency
RUN apk update && apk upgrade
RUN apk add git make g++ libc6-compat

# Add pipx installed binaries to PATH
ENV PATH="/root/.local/bin:$PATH"

# Copy items into the image.
# Note the .dockerignore file which excludes the node_modules directory.
COPY . .

# Install dependencies
RUN yarn install

# Run the build script.
RUN yarn build

# Use production node environment by default.
ENV NODE_ENV production

EXPOSE 3001

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3001

CMD yarn start
