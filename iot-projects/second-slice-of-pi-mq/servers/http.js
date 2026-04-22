var sensorRoutes = require('./../routes/sensors')
var actuatorRoutes = require('./../routes/actuators')
const express = require('express'),
	cors = require('cors');
	
// TODO: set up the express http server to serve the pi endpoints (sensors / actuators)

var app = express();
app.use(cors());

app.use('/pi/sensors',sensorRoutes);
app.use('/pi/actuators',actuatorRoutes)

app.get("/", function(req, res) {
	res.send("You have accessed the root.");
});

app.get("/pi", function(req, res) {
	res.send("You have accessed the pi.");
});

module.exports = app;
// I have looked through all files