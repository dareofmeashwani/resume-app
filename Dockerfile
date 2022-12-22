FROM node:16

WORKDIR /usr/app

COPY package*.json ./
COPY src src
RUN yarn setup
RUN yarn build:prod
EXPOSE 3001
CMD [ "yarn", "start:prod" ]