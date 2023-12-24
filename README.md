# [ashwanikumarverma.co.in](https://ashwanikumarverma.co.in/)

## MERN Tech Stack

Back-end - NodeJs, ExpressJs, MongoDB, Mongoose

Front-end - ReactJs, Material UI

## Features

Calendly UI & webhook integration
Gmail Integration Using NodeMailer
User SignIn/SignUp/SignOut workflow
User password update
Content Management by admin(currently using api only)
Schedule meeting
## Prerequisites

NodeJs, Yarn

## Setup

    yarn setup

## Environment Variables

    DB_HOSTNAME=
    DB_PASSWORD=
    DB_NAME=
    DB_USERNAME=
    PRIVATE_KEY=
    PRIVATE_KEY2=
    SESSION_EXPIRY=
    TOKEN_EXPIRY=
    PORT=
    HASH_SALT=
    DOMAIN_NAME=
    DOMAIN_ADDRESS=
    ENV=
    EMAIL=
    EMAIL_PASSWORD=
## Development

    yarn dev

## Production

    yarn build:prod
    yarn start:prod

## What you will learn from it
    Express session management with mongodb store
    SignIn/SignUp/SignOut workflow
    OpenApi Spec Intergration with ExpressJs
    How to Use Mongoose
    ReactJs
    Rest API
    Gmail email service integration

[Demo](https://ashwanikumarverma.co.in/)

Open for contribution,sharing the knowledge, feedbacks & suggestions.

## Docker
docker build .
docker run -d -p 127.0.0.1:80:3001 <Image-Id>