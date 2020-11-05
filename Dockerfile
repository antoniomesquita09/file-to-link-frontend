FROM node:14.4.0-alpine as base

ARG NODE_ENV
ARG PORT

ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT

RUN apk add --update --no-cache alpine-sdk python

WORKDIR /frontend/

COPY package.json yarn.lock jsconfig.json .eslintrc.js prettier.config.js /frontend/

RUN yarn --pure-lockfile

COPY src /frontend/src/

COPY public /frontend/public/

EXPOSE 3000

FROM base as development

CMD yarn start