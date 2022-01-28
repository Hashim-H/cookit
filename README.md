# Cookit Overview

Cookit is an app that allows users to create recipes and view those created by other users of the app.

# Tech stack

The front-end is built on React with Chakra UI as the CSS framework. The Express back-end relies on PostgreSQL as database supporting user management and storing of recipes data. Knex is used as query builder and Multer middleware enables image upload.

# Getting Started with Cookit

Create a `.env` file at the root of the `server` directory with the following variables initialized to your setup and preferences:

<br/>

```console
DB_HOST=localhost
DB_USER=
DB_PASSWORD=
DB_PORT=5432
DB_NAME=cookit
SERVER_PORT=5000
CORS_ALLOWED_ORIGIN=http://localhost:3000
```

<br/>

Set-up and populate the the tables required by the back-end by running the migrate script.

<br/>

```console
node server/migrate.js
```

<br/>

In the `server` directory run the following:

<br/>

```console
npm install
npm start
```

<br/>

This will start the server on the specified port using nodemon, for example [http://localhost:5000](http://localhost:5000)

<br/>

Move to the `client` directory and run the following commands

<br/>

```console
npm install
npm start
```

<br/>

This will start the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser (make sure to change the port number according to your setup).
