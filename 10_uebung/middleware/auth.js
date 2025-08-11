const express = require("express");
const jwt = require("jsonwebtoken");
const authenticated = express.Router();
const geheim = "test";

authenticated.get("/ping", (req, res) => res.send("auth ping"));

module.exports = { authenticated };
