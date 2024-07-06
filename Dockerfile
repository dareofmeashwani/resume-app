FROM node:16

WORKDIR /usr/app
ENV ENV=production
COPY package*.json ./
COPY src src
COPY yarn.lock ./
RUN yarn setup
RUN yarn build:prod
EXPOSE 3001
CMD [ "yarn", "start:prod" ]