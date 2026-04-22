// In this file, you will work on TODOs 5d and 6d

var mqPlugin = require("./plugins/internal/mqPlugin");
var dhtPlugin = require("./plugins/internal/dhtPlugin");
mqPlugin.start();
dhtPlugin.start();

const httpServer = require('./servers/http'),
	resources = require('./resources/model');

const server = httpServer.listen(resources.pi.port, function () {
	console.log("Running the Pi on port " + resources.pi.port);
});

process.on('SIGINT', function() {
	mqPlugin.stop();
	dhtPlugin.stop();
	process.exit();
});
