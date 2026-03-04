const http = require("http");
const port = 3000;

let serverStatus = undefined;

const server = http
  .createServer(function (req, res) {
    try {
      if (req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write(JSON.stringify(serverStatus.status));
      } else if (req.method === "PUT") {
        let body = "";
        req.on("data", function (chunk) {
          body += chunk;
        });
        req.on("end", function () {
          serverStatus = {};
          serverStatus.status = JSON.parse(body);
          console.log("fuyrn");
        });
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write("The server has been updated");
      } else if (req.method === "DELETE") {
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
