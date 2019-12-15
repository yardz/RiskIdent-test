# RiskIdent - TEST

Developed By Bruno Motta

# Architecture

This API was developed using [NestJs](https://nestjs.com/) framework. It is a typescript framework that use same patterns as Angular.
For the routing Nestjs can use Express or Fastify, in case of these projet i used express as it is the default choice for framework and it has more community support

To hosting i used [Firebase](https://firebase.google.com/), since its has a easy setup for Google Cloud and the free plan has a very large support. Another advantage of firebase is that in the future, its decided create a frontend for that project, its very easy add the code on same repo and use a monorepo project.

And the deploy is very easy, just `firebase deploy` on root.

# Setup & Run

## Setup

1. Clone this repo.
2. Inside `root` use `npm i` to install firebase tools
3. Inside `cd functions/` use `npm i` to install dependencies

## Run

**IMPORTANT:** All commands below are used inside folder `/functions`, sou check if you are inside correct folder.

-   `npm run start`: Create local instance that simulate google cloud function for the API. This instance has no hotrealod.
-   `npm run start:dev`: this command will start API locally, it will be accessible on address `http://localhost:3000/` for example, you will do a request on `http://localhost:3000/transactions?transactionId=5c868b22eb7069b50c6d2d32&confidenceLevel=1`
-   `npm run test` will run unit tests on project.
-   `npm run test:cov` will run unit tests on project, and show coverage (it is 100% :-D).
-   `npm run test:e2e` will run end-to-end tests (yes, it has!)
-   `npm run lint` will run tslint.
-   `npm run format` will format the code.

## Swagger

If you wish to test you can use [Swagger](https://swagger.io/) to do this. Just access `https://us-central1-riskident-test.cloudfunctions.net/api/swagger/` or click [here](https://us-central1-riskident-test.cloudfunctions.net/api/swagger/)

### Localhost

If you wish to test in your local, you can run `npm run start:dev` and access `http://localhost:3000/swagger/` (or click [here](http://localhost:3000/swagger/) - if you already started the server) and try use on localhost server or Google server.

### Onlyne API

You can access all routes at `https://us-central1-riskident-test.cloudfunctions.net/api` and do requests like this `https://us-central1-riskident-test.cloudfunctions.net/api/transactions?transactionId=5c868b22eb7069b50c6d2d32&confidenceLevel=0.5`
