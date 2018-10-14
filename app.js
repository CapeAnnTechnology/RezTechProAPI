const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');
// const routesLegacy = require('./v1.0/routes/routes.js');

const routes = require('./v3.0/routes/routes.js');

const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');

const socketIO = require('socket.io');

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
  // routesLegacy(app, db);


  // Initialize the app.
  const server = app.listen(process.env.PORT || 3000, () => {
    console.log('App now running on port', port);
  });

  const io = socketIO(server);

  // io.on('connection', (socket) => {
  //   console.log('Client connected');
  //   socket.on('disconnect', () => console.log('Client disconnected'));
  // });

  // setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

  let count = 0;

  io.on('connect', (socket) => {
      console.log('Connected client on port %s.', process.env.PORT || 3000);

      socket.on('message', (m) => {
          console.log('[server](message): %s', JSON.stringify(m));
          io.emit('message', m);
      });

      socket.on('guest', (g) => {
          console.log('[server](guest): %s', JSON.stringify(g));
          console.log(g.action);
          let message = {};
          if(g.action == 3){
            count = count + 1;
            message = {from: g.from, content: 'User Entered, count: '+count};
          }else if(g.action == 4){
            count = Math.max((count - 1),0);
            message = {from: g.from, content: 'User Exited, count: '+count};
          }
          io.emit('message', message);
      });

      socket.on('disconnect', () => {
          console.log('Client disconnected');
      });
  });

});

// References:
// https://www.codementor.io/wapjude/creating-a-simple-rest-api-with-expressjs-in-5min-bbtmk51mq
// https://www.sitepoint.com/deploy-rest-api-in-30-mins-mlab-heroku/

