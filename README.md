# Node.js Express API with TypeScript 3

## Description
This generator will help you to build your own Node.js Express Mongodb API using TypeScript 3.

### Project Introduction
- suppot ES6/ES7 features
- using tslint followed [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

## Features
##### Authentication:
- passport local strategy
- jwt authentication
- OAuth2.0 Server (Authorization code grant, Refresh token grant)
##### Session Storage:
- MongoDB
- Redis
##### Integration testing
- mocha
- chai
- supertest

## Requirements

- node >= 10
- npm >= 6
- mongodb >= 3.0
- typescript >= 3.0

## Installation

First, install [Yeoman](http://yeoman.io) and generator-node-express-typescript-api using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-node-express-typescript-api
```

Then generate your new project:

```bash
yo node-express-typescript-api
```
## App skeleton
```
.
├── LICENSE
├── README.md
├── nodemon.json
├── package.json
├── src
│   ├── components
│   │   ├── Auth
│   │   │   ├── index.ts
│   │   │   ├── interface.ts
│   │   │   ├── service.ts
│   │   │   └── validation.ts
│   │   ├── User
│   │   │   ├── index.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── service.ts
│   │   │   └── validation.ts
│   │   ├── index.ts
│   │   └── validation.ts
│   ├── config
│   │   ├── connection
│   │   │   └── connection.ts
│   │   ├── env
│   │   │   └── index.ts
│   │   ├── error
│   │   │   ├── index.ts
│   │   │   └── sendHttpError.ts
│   │   ├── middleware
│   │   │   ├── middleware.ts
│   │   │   └── passport.ts
│   │   └── server
│   │       ├── ServerInterface.ts
│   │       ├── index.ts
│   │       ├── server.ts
│   │       └── serverHandlers.ts
│   └── routes
│       ├── AuthRouter.ts
│       ├── UserRouter.ts
│       └── index.ts
├── swagger.json
├── swaggerDef.js
├── tsconfig.json
└── tslint.json
```
## Running the API
### Development
To start the application in development mode, run:

```bash
npm install -g nodemon
npm install -g ts-node
npm install -g typescript
npm install
```

Start the application in dev env:
```
nodemon
```
Start the application in production env:

Install ts pm2 and typescript compiler:
```
npm install -g pm2
pm2 install typescript
```

example start with scale on 2 core:
```
pm2 start ./src/index.ts -i 2 --no-daemon
```

Express server listening on http://localhost:3000/, in development mode
The developer mode will watch your changes then will transpile the TypeScript code and re-run the node application automatically.

### Testing
To run integration tests:
```bash
npm test
```

## Set up environment
In root folder you can find `.env`. You can use this config or change it for your purposes.
If you want to add some new variables, you also need to add them to interface and config object (Look `src/config/index.ts`)

## Usage as OAuth2.0 Server
To use this generator as OAuth2.0 server you should implement client side, that will be handle your redirectUris and make requests to `/auth/token/` route. [Read more about OAuth2.0](https://alexbilbie.com/guide-to-oauth-2-grants/)

## Swagger
```bash
npm install -g swagger-jsdoc
swagger-jsdoc -d swaggerDef.js -o swagger.json
```
Swagger documentation will be available on route:
```bash
http://localhost:3000/docs
```
![Alt Text](https://i.ibb.co/b6SdyQV/gif1.gif)

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

[travis-image]: https://travis-ci.org/caiobsouza/generator-ts-node-api.svg?branch=master
[travis-url]: https://travis-ci.org/caiobsouza/generator-ts-node-api


## Dockerization

### Network

```bash
  docker network create family-calendar-network
```

### Backend

```bash
  cd (...)/family-calendar
  docker build -t family-calendar-backend -f backend/Dockerfile ./backend
  docker stop family-calendar-backend

  docker run --rm --name family-calendar-backend \
    --network family-calendar-network \
    -dp 3000:3000 \
    family-calendar-backend

  docker logs family-calendar-backend
  docker tag family-calendar-backend nicolasmura/family-calendar-backend
  docker push nicolasmura/family-calendar-backend

  # Start / stop the container with its name
  docker start family-calendar-backend
  docker stop family-calendar-backend

  # Running our Image on a New Instance
  docker run --rm --name family-calendar-backend \
    --network family-calendar-network \
    -dp 3000:3000 \
    nicolasmura/family-calendar-backend
```

### Database

```bash
  cd (...)/family-calendar
  chmod +x backend/scripts/mongo-init.sh
  docker build -t family-calendar-database -f backend/Dockerfile.mongodb ./backend
  docker stop family-calendar-database

  docker run --rm --name family-calendar-database \
    --hostname family-calendar-database \
    --network family-calendar-network --network-alias database \
    --env-file ./backend/.env \
    -v /Users/nmura/dev/perso/family-calendar/mongodb_vol/data/log:/var/log/mongodb/ \
    -v /Users/nmura/dev/perso/family-calendar/mongodb_vol/data/db:/data/db/ \
    -dp 28067:28067 \
    family-calendar-database --port 28067

  docker logs family-calendar-database
  docker tag family-calendar-database nicolasmura/family-calendar-database
  docker push nicolasmura/family-calendar-database

  # Test
  docker exec -it family-calendar-database bash

  # Start / stop the container with its name
  docker start family-calendar-database
  docker stop family-calendar-database

  # Running our Image on a New Instance
  docker run --rm --name family-calendar-database \
    --hostname family-calendar-database \
    --network family-calendar-network --network-alias database \
    --env-file ./backend/.env \
    -v /Users/nmura/dev/perso/family-calendar/mongodb_vol/data/log:/var/log/mongodb/ \
    -v /Users/nmura/dev/perso/family-calendar/mongodb_vol/data/db:/data/db/ \
    -dp 28067:28067 \
    nicolasmura/family-calendar-database --port 28067
```

### Both

```bash
  # Start up the whole application (front + back + mongodb) stack using the docker-compose
  docker-compose -f docker-compose.yml --env-file ./backend/.env up
  docker-compose -f docker-compose.yml --env-file ./backend/.env up -d
  docker-compose -f docker-compose.yml --env-file ./backend/.env up -d --build

  docker-compose -f docker-compose.yml --env-file ./backend/.env up -d --build
  docker-compose -f docker-compose.prod.yml --env-file ./backend/.env up -d --build

  docker-compose -f docker-compose.yml --env-file ./backend/.env down
  docker-compose -f docker-compose.prod.yml --env-file ./backend/.env down

  # Test
  docker exec -it backend bash
  docker exec -it database bash
```

### Debugging network

```bash
  docker run -it --network family-calendar-network nicolaka/netshoot
  dig family-calendar-database
```