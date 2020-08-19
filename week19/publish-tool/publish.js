const http = require("http");
const querystring = require("querystring");
const fs = require("fs");
const archiver = require("archiver");

let package = "./package";

// fs.stat(filename,(error,stat) => {
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
  console.log("end");
});
// archive.pipe(fs.createWriteStream("./package.zip"));

// Write data to request body
// let readStream = fs.createReadStream("./cat.jpg");
// readStream.pipe(req);

// });
