FROM node:16-alpine

RUN apk add --no-cache bash

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn

COPY . .

CMD ["yarn", "dev"]