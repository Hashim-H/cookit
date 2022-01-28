"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const corsConfig = {
  origin: process.env.CORS_ALLOWED_ORIGIN,
  credentials: true,
};

const app = express();

const router = require("./router.js");

app.use(morgan("dev"));
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.get("*", (req, res) => {
  res.status(404).send("404 Page Not Found");
});

module.exports = app;
