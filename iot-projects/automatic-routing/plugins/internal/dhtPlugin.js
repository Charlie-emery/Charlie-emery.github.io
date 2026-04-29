// const { connect } = require('../../routes/sensors');
// const resources = require('./../../resources/model');
// const sensorDriver = require('node-dht-sensor');

// let interval, sensor;
// const device = resources.pi.sensors.dht;
// let localParams = {'frequency': 2000};

// // TODO 6a: connectHardware, 6b: start, 6c: stop

// function connectHardware() {
//   sensor = {
//     initialize: function() {
//       sensorDriver.initialize(device.model, device.gpio);
//     },
//     read: function() {
//       var tdata = sensorDriver.read(device.model, device.gpio)
//       device.temperature.value = parseFloat(tdata.temperature);
//       device.humidity.value = parseFloat(tdata.humidity);
//     }
//   }
//   sensor.initialize();
//   interval = setInterval(function() {
//     sensor.read();
//   }, localParams.frequency);
// }

// function start(params) {
//   localParams = params ? params : localParams;
//   connectHardware();
// }

// function stop() {
//   clearInterval(interval);
// }

// exports.start = start;
// exports.stop = stop;
