FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
COPY src ./

RUN yarn setup
RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]