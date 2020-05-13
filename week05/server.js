const http = require("http");

const server = http.createServer((_, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-Foo", "bar");
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello my server");
});

server.listen(3000, function () {
  console.log("my server is listening on 3000");
});
