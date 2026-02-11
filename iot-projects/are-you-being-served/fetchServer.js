// fetchServer.js file
var args = process.argv.slice(2);
const http = require("http");
const async = require("async");

const port = 8686;

http
  .createServer(async function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    var url = args[0] ? args[0] : "http://Charlie-emery.github.io";
    let fetchResponse = await fetch(url);
    // let fetchResponse = await fetch("http://Charlie-emery.github.io");

    if (fetchResponse.ok === true) {
      let html = await fetchResponse.text();
      res.write(html);
      res.end;
    } else {
      res.write("error");
      res.write(fetchResponse.statusText);
      res.write(fetchResponse.status);
      res.end;
    }
  })
  .listen(port);
