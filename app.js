const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');
const routesLegacy = require('./v1.0/routes/routes.js');
const routes = require('./v2.0/routes/routes.js');

const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');

// const version = '2.0.1';

/*
 |--------------------------------------
 | MongoDB
 |--------------------------------------
 */


mongoose.connect(process.env.MONGODB_URI);
const monDb = mongoose.connection;

monDb.on('error', () => {
  console.error(
    'MongoDB Connection Error. Please make sure that',
    process.env.MONGODB_URI, 'is running.',
  );
});

monDb.once('open', () => {
  console.info('Connected to MongoDB:', process.env.MONGODB_URI);
});

const mongodb = require('mongodb');

// const ObjectID = mongodb.ObjectID;

// Create a database variable outside of the database connection
// callback to reuse the connection pool in your app.
let db;

// Set up the routing.
// var legacy = express.Router();
// var current = express.Router();

/*
 |--------------------------------------
 | App
 |--------------------------------------
 */

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());

// Set port
const port = process.env.PORT || '3000';
app.set('port', port);

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, (err, client) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  // 2.x version
  // db = database;
  // 3.x version
  db = client.db(process.env.MONGODB_DB);
  console.log('Database connection ready');

  routes(app, db);
  routesLegacy(app, db);


  // Initialize the app.
  app.listen(process.env.PORT || 3000, () => {
    console.log('App now running on port', port);
  });
});

// References:
// https://www.codementor.io/wapjude/creating-a-simple-rest-api-with-expressjs-in-5min-bbtmk51mq
// https://www.sitepoint.com/deploy-rest-api-in-30-mins-mlab-heroku/

