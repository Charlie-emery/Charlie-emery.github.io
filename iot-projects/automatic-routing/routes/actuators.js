const express = require("express"),
  router = express.Router(),
  resources = require("./../resources/model");

// TODO: add routes to expose the actuators on the Pi (LEDs / relays etc.)
// router.route("/").get(function (req, res, next) {
//   req.result = resources.pi.actuators;
//   next();
// });
// router.route("/leds").get(function (req, res, next) {
//   req.result = resources.pi.actuators.leds;
//   next();
// });
// router.route("/leds/:id").get(function (req, res, next) {
//   req.result = resources.pi.actuators.leds[req.params.id];
//   next();
// });

router.route("/leds/:id").put(function (req, res, next) {
  var selectedLed = resources.pi.actuators.leds[req.params.id];
  selectedLed.value = req.body.value;
  req.result = selectedLed;
  ledsPlugin.switchOnOff[req.params.id](req.body.value);
  next();
});

module.exports = router;
