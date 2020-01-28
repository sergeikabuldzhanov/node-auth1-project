const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

module.exports = server => {
  server.use(cors());
  server.use(helmet());
  server.use(express.json());
  // server.use(cookieParser());
  server.use(
    session({
      name: "sessionId",
      secret: process.env.SECRET || "local secret for local developers",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: true,
        httpOnly: true
      },
      resave: false,
      saveUninitialized: true,
      store: new KnexSessionStore({
        knex: require("../data/db-config"),
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 1000 * 60 * 60
      })
    })
  );
};
