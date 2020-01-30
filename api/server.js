//imports
const express = require("express");

//routers
const apiRouter = require('./api-router');

// this function aggregates all the plugging in of middlewares
const configureMiddleware = require("./configureMiddleware");

//create server instance
const server = express();
configureMiddleware(server);

//connect routers
server.use('/api', apiRouter);


module.exports = server;
