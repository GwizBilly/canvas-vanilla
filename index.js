const http    = require('http'),
      express = require('express'),
      app     = express(),
      server  = http.createServer(app);
app.use(express.static("./"));
server.listen(8080);
console.log("localhost:8080");
