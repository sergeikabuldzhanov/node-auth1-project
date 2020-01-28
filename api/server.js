//imports
const express = require("express");
const fs = require('fs');
const https = require('https');

//routers
const apiRouter = require('./api-router');

// this function aggregates all the plugging in of middlewares
const configureMiddleware = require("./configureMiddleware");

//create server instance
const server = express();
configureMiddleware(server);

//connect routers
server.use('/api', apiRouter);

const secureServer = https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, server)


module.exports = secureServer;
