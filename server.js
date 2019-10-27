var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");

// initialize express
var express = require("express");
var app = express();

// dev logger
app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// set public folder to static
app.use(express.static(process.cwd() + "/public"));

// handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// mongoose connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines"
);

// port
var port = process.env.PORT || 3030;

// controller route
var routes = require("./controller/controller");
app.use("/", routes);

// listen to local network
app.listen(port, function() {
  console.log("Listening on https://localhost:" + port);
});
