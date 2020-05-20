const http = require("http");

const server = http.createServer((_, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-Foo", "bar");
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(`
    <html maaa=a>
      <head>
        <style>
          body div #myid {
            width:100px;
            background-color:#ff5000;
          }
          body div img {
            width: 30px;
            background-color:#ff1111;
          }
        </style>
      </head>
      <body>
          <div>
            <img id="myid"/>
            <img/>
          </div>
      </body>
    </html>
  `);
});

server.listen(3000, function () {
  console.log("my server is listening on 3000");
});
