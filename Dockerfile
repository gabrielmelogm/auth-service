FROM node:16-alpine

RUN apk add --no-cache bash

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn

COPY . .

RUN echo 'DATABASE_URL="mysql://maximize:cmsmaximize@cms-database/cms"' > .env

RUN chmod +x .docker/entrypoint.sh