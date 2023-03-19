# AED Map

[![Build docker images](https://github.com/OleksandrHavron/AED-Map/actions/workflows/build_images.yml/badge.svg?branch=master)](https://github.com/OleksandrHavron/AED-Map/actions/workflows/build_images.yml)

[![Build node js app](https://github.com/OleksandrHavron/AED-Map/actions/workflows/nodejs-build.yml/badge.svg?branch=master)](https://github.com/OleksandrHavron/AED-Map/actions/workflows/nodejs-build.yml)


## 1. Prerequisites

1. Require to install

```
- NodeJS 12+ https://nodejs.org/
- yarn https://classic.yarnpkg.com/en/docs/install/#debian-stable
```

2. Install node modules

```
yarn install - installing node modules for backend part
cd client && yarn install - installing node modules for frontend part
```

## 2. How to run

1. Run locally

```
yarn server - run backend part
yarn client - run frontend part
or
yarn dev - run both backend and frontend
```

2. Run in production mode

```
yarn build - build React production-build
yarn start - run start.js file with setupped environment
```

3. Run locally with help of Docker

```
3.1 Install Docker Desktop
3.2 Run a command "docker-compose build" in the root folder
3.3 Run a command "docker-compose up" in the root folder
```

## 3. Database connection

### Environment variables

```
MONGO_DB_USER - name of user with access to MongoDB
MONGO_DB_PASSWORD - password for user
MONGO_DB_HOST - host name for application
MONGO_DB_NAME - name of the database
```

### Migrate to MongoDB

You can use command migrations only once - after Up should be Down, after Down - Up.

1. Add new admin and defibrillators (from db/mocks/defibrillators.json file)

```
yarn database-up
```

2. Remove all admins and defibrillators

```
yarn database-down​
```

## 4. Environment variables for JWT configuration

```
SECRET_JWT_KEY_AUTH - jwt secret key based on email and id
EXPIRE_TIME_JWT_AUTH - expiration time 1 hour
SECRET_JWT_KEY_SIGN_UP - jwt secret key based on email
EXPIRE_TIME_JWT_SIGN_UP - expiration time 1 hour
SECRET_JWT_KEY_RESET - jwt secret key for password reseting
EXPIRE_TIME_JWT_RESET - expiration time 1 hour
```

## 5. Other environment variables

### Email configuration

```
BASE_URL - URL for redirection to main page of app from email
EMAIL_USER - Mail account username
EMAIL_PASSWORD - Mail account password
EMAIL_FROM - Mail account for users notification(successfull registration, password reseting ...)
```

### Admin credentials

```
ADMIN_EMAIL
ADMIN_PASSWORD
```

### Google maps api

Generate your own Google API key in developer console
https://developers.google.com/maps/documentation/geocoding/get-api-key

```
GOOGLE_API_KEY
```
