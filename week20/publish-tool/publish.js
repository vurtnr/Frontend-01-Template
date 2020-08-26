const http = require("http");
const querystring = require("querystring");
const fs = require("fs");
const archiver = require("archiver");
const child_process = require("child_process");

let package = "./package";

const redirect_uri = encodeURIComponent("http://localhost:8081/auth");
child_process.exec(
  `open https://github.com/login/oauth/authorize?client_id=Iv1.0353b72128f8214d&redirect_uri=${redirect_uri}&scope=read%3Auser&state=abc123`
);

const server = http.createServer((request, res) => {
  let token = request.url.match(/token=([^&]+)/)[1];
  console.log("real publish!!");
  const options = {
    host: "localhost",
    port: 8081,
    path: "/?filename=package.zip",
    method: "POST",
    headers: {
      token: token,
      "Content-Type": "application/octet-stream",
    },
  };

  const archive = archiver("zip", {
    zlib: { level: 9 },
  });

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  });
  req.on("error", (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  archive.directory(package, false);
  archive.finalize();
  archive.pipe(req);
  archive.on("end", () => {
    req.end();
    console.log('publish success!!')
    server.close();
  });
});

server.listen(8080);

// fs.stat(filename,(error,stat) => {
/*
const options = {
  host: "localhost",
  port: 8081,
  path: "/?filename=package.zip",
  method: "POST",
  headers: {
    "Content-Type": "application/octet-stream",
    // "Content-Length": 0,
  },
};

const archive = archiver("zip", {
  zlib: { level: 9 },
});

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
});
req.on("error", (e) => {
  console.error(`problem with request: ${e.message}`);
});
archive.directory(package, false);
archive.finalize();
archive.pipe(req);
archive.on("end", () => {
  req.end();
  
});

//code = ae7428fd7bee18052b1f
// archive.pipe(fs.createWriteStream("./package.zip"));

// Write data to request body
// let readStream = fs.createReadStream("./cat.jpg");
// readStream.pipe(req);

// });
*/
