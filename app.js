var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();

// removed pdfkit
// var PDFDocument = require('pdfkit');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

// Initialize the app.
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

// References:
// https://www.codementor.io/wapjude/creating-a-simple-rest-api-with-expressjs-in-5min-bbtmk51mq