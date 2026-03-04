const http = require("http");
const port = 3000;

let serverStatus = { status: undefined, messages: [] };

const server = http
  .createServer(function (req, res) {
    try {
      if (req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write(JSON.stringify(serverStatus.status));
        res.write(JSON.stringify(serverStatus.messages));
      } else if (req.method === "PUT") {
        let body = "";
        req.on("data", function (chunk) {
          body += chunk;
        });
        req.on("end", function () {
          serverStatus.status = JSON.parse(body);
        });
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write("The server has been updated");
      } else if (req.method === "DELETE") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        serverStatus = undefined;
        res.write("data deleted");
      } else if (req.method === "POST") {
        let body;

        req.on("data", function (chunk) {
          body = chunk.toString();
        });
        req.on("end", function () {
          serverStatus.messages.push(body);
        });
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write("recived " + serverStatus.messages);
      }
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      // res.writeHead(500, { "Content-Type": "text/plain" });
      res.write("The server has no data ");
    } finally {
      res.write(" -and the message arrived");
      res.end();
    }
  })
  .listen(port);
