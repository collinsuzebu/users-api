# User Management API

## Technology Stack:

This project uses the following technologies and libraries:

[Node.js](https://nodejs.org/en/) for server

[Express.js](http://expressjs.com/) as Node web framework

[MongoDB](https://www.mongodb.com/) for persistent data storage.

[Babel](https://babeljs.io/) Compiler for JavaScript.

[Jest](https://jestjs.io/) Testing framework.

## Setup and Run Locally

```
git clone
cd users-api
npm install
npm run dev
```

To run production build,
`npm start`

To connect to a remote mongo database, set `MONGO_DB_CONNECTION_STRING=` in the `.env` file.

## Test

Test covers happy paths... :)

To run test...
`npm run test`
