var express = require("express");
var bodyParser = require("body-parser");
var routes_legacy = require("./v1.0/routes/routes.js");
var routes = require("./v2.0/routes/routes.js");
var app = express();

var version = '2.0.1';
// removed pdfkit
// var PDFDocument = require('pdfkit');

// Set up the routing.
// var legacy = express.Router();
// var current = express.Router();

app.use(allowCrossDomain);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);
routes_legacy(app);

// Initialize the app.
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

// References:
// https://www.codementor.io/wapjude/creating-a-simple-rest-api-with-expressjs-in-5min-bbtmk51mq