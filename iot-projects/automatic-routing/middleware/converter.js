const json2html = require("node-json2html");
var info1 = 0;
var info2 = 0;
module.exports = function () {
  return function (req, res, next) {
    // TODO 2: Create the converter function
    if (req.result) {
      valueOfDevice(req.result);
      console.log(req.result);
      if (req.accepts("html")) {
        let render = {
          "<>": "div",
          html: [
            {
              "<>": "p",
              html: [
                { "<>": "b", html: "Property1: " },
                { "<>": "p", html: info1 },
              ],
            },
            {
              "<>": "p",
              html: [
                { "<>": "b", html: "Property2: " },
                { "<>": "p", html: info2 },
              ],
            },
          ],
        };
        res.send(json2html.render(req.result, render));
      } else {
        res.send(req.result);
      }
    } else {
      next();
    }
  };
};

function valueOfDevice(data) {
  if (data.name === "MQ Sensor") {
    info1 = data.value.raw;
    info2 = data.value.avg;
  } else if (data.name === "DHT22 Sensor") {
    info1 = data.temperature.value;
    info2 = data.humidity.value;
  } else if (data.name === "Actuators List") {
    info1 = data.leds["1"].value;
    info2 = data.leds["2"].value;
  }
}
