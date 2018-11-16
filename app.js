const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');
// const routesLegacy = require('./v1.0/routes/routes.js');

const routes = require('./v3.0/routes/routes.js');

const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');
const methodOverride = require('method-override');
const cors = require('cors');

const socketIO = require('socket.io');

const Guest = require('./v3.0/models/Guest');
const Room = require('./v3.0/models/Room');

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

let socketRooms = new Array();

/*
 |--------------------------------------
 | App
 |--------------------------------------
 */

const app = express();

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
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

  routes(app, db, socketRooms);
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

      // console.log("ip: "+socket.request.connection.remoteAddress);
      // console.log("user-agent: "+socket.request.headers['user-agent']);

      // console.log(rooms);
      // io.emit('rooms', rooms);

      socket.on('message', (m) => {
          console.log('[server](message): %s', JSON.stringify(m));
          io.emit('message', m);
      });

      socket.on('guest', (g) => {
          console.log('[server](guest): %s', JSON.stringify(g));
          // console.log(g.action);
          let data = 0;
          if( undefined !== socketRooms[g.roomId] && undefined !== socketRooms[g.roomId].occupancy ){
            count = socketRooms[g.roomId].occupancy;
          }else{
            count = 0;
          }
          if(g.action == 3){ // Guest Entered
            count = parseInt(""+count) + 1;
            data = 1;
          }else if(g.action == 4){ // Guest Exited
            count = Math.max((parseInt(""+count) - 1),0);
            data = -1;
          }
          const room = new Room({
            _id: g.roomId,
            capacity: g.capacity,
            occupancy: count
          });

          // If child is set, change capacity on parent
          // rooms[g.parent] = occupancy - 1
          // io.emit('room', roomParent);


          // const guestSchema = new Schema({
          //   roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
          //   doorId: { type: Schema.Types.ObjectId, ref: 'Door', required: true },
          //   timestamp: { type: Date, required: true },
          //   data: { type: String, required: true },
          //   count: { type: String, required: true },
          //   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
          //   action: { type: String, required: true },
          //   additional: [],
          // });

          const guest = new Guest({
            roomId: g.roomId,
            doorId: g.doorId,
            timestamp: new Date(),
            data: data,
            count: count,
            userId: ObjectId("5b36ae40215f4e0700b94870"),
            action: g.action,
            additional: [],
            ipAddress: socket.request.connection.remoteAddress,
            userAgent: socket.request.headers['user-agent'],
          });
          guest.save((err) => {
            if (err) {
              // return res.status(500).send({message: err.message});
              console.log({message: err.message});
            }
          });

          io.emit('room', room);
          // store room into object
          socketRooms[g.roomId] = room;
      });

      socket.on('disconnect', () => {
          console.log('Client disconnected');
      });
  });

});

// References:
// https://www.codementor.io/wapjude/creating-a-simple-rest-api-with-expressjs-in-5min-bbtmk51mq
// https://www.sitepoint.com/deploy-rest-api-in-30-mins-mlab-heroku/

