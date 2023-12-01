# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=20.9.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production


WORKDIR /usr/src/app

# Copy the rest of the source files into the image.
COPY . .

RUN npm install
# Run the application as a non-root user.
USER node




# Expose the port that the application listens on.
EXPOSE 80

# Run the application.
CMD node src/index.js
