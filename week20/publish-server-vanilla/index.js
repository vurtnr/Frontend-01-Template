const http = require("http");
const fs = require("fs");
const unzipper = require("unzipper");
const https = require("https");

const server = http.createServer((req, res) => {
  if (req.url.match(/^\/auth/)) return auth(req, res);
  if (!req.url.match(/^\/?/)) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("not found");
    return false;
  }

  const options = {
    hostname: "api.github.com",
    port: 443,
    path: `/user`,
    method: "GET",
    headers: {
      Authorization: `token ${req.headers.token}`,
      "User-Agent": "toy-publish-vurtne",
    },
  };

  const request = https.request(options, (response) => {
    let body = "";

    response.on("data", (d) => {
      body += d.toString();
    });
    response.on("end", () => {
      console.log(body);
      let user = JSON.parse(body);
      let writeStream = unzipper.Extract({ path: "../server/public" });
      req.pipe(writeStream);
      req.on("end", () => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("okay");
      });
    });
  });

  request.on("error", (e) => {
    console.error(e);
  });

  request.end();
});

function auth(req, res) {
  let code = req.url.match(/code=([^&]+)/)[1];
  let state = "abc123";
  let client_secret = "7a74dcd13354b3867ae8b7d028afefc54c9a4c87";
  let client_id = "Iv1.0353b72128f8214d";
  let redirect_uri = encodeURIComponent("http://localhost:8081/auth");
  let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;
  // let url = `https://github.com/login/auth/access_token?${params}`

  const options = {
    hostname: "github.com",
    port: 443,
    path: `/login/oauth/access_token?${params}`,
    method: "POST",
  };
  const request = https.request(options, (response) => {
    console.log("statusCode:", res.statusCode);
    console.log("headers:", res.headers);

    response.on("data", (d) => {
      let result = d.toString().match(/access_token=([^&]+)/);
      if (result) {
        let token = result[1];
        res.writeHead(200, {
          access_token: token,
          "Content-Type": "text/html",
        });
        res.end(
          `<a href="http://localhost:8080/publish?token=${token}">publish</a>`
        );
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end("error");
      }
    });
  });

  request.on("error", (e) => {
    console.error(e);
  });

  request.end();

  // res.writeHead(200, { "Content-Type": "text/plain" });
  // res.end("okay");
}

server.listen(8081);
