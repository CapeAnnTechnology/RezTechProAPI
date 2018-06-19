var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var routes_legacy = require("./v1.0/routes/routes.js");
var routes = require("./v2.0/routes/routes.js");

const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');


/*
 |--------------------------------------
 | MongoDB
 |--------------------------------------
 */


mongoose.connect(process.env.MONGODB_URI);
const monDb = mongoose.connection;

monDb.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that', process.env.MONGODB_URI, 'is running.');
});

monDb.once('open', function callback() {
  console.info('Connected to MongoDB:', process.env.MONGODB_URI);
});



var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var version = '2.0.1';
// removed pdfkit
// var PDFDocument = require('pdfkit');

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

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
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  // 2.x version
  // db = database; 
  // 3.x version
  db = client.db(process.env.MONGODB_DB);
  console.log("Database connection ready");

  routes(app,db);
  routes_legacy(app,db);


  // Initialize the app.
  var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// References:
// https://www.codementor.io/wapjude/creating-a-simple-rest-api-with-expressjs-in-5min-bbtmk51mq
// https://www.sitepoint.com/deploy-rest-api-in-30-mins-mlab-heroku/




