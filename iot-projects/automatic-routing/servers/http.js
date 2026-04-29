const createRouter = require("./../routes/automate");
const resources = require("./../resources/model");
const bodyParser = require("body-parser");
const express = require("express"),
  cors = require("cors");

const converter = require("./../middleware/converter");
var sensorRoutes = require("./../routes/sensors");
var actuatorRoutes = require("./../routes/actuators");

// TODO: set up the express http server to serve the pi endpoints (sensors / actuators)

var app = express();
app.use(bodyParser.json());
app.use(cors());

// app.use('/pi/sensors',sensorRoutes);
app.use("/pi/actuators", actuatorRoutes);

// app.get("/", function(req, res) {
// res.send("You have accessed the root.");
// });

// app.get("/pi", function(req, res) {
// 	res.send("You have accessed the pi.");
// });

app.use("/", createRouter(resources));
app.use(converter());

module.exports = app;
// I have looked through all files
