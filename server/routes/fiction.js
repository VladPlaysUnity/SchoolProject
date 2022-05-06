const express = require("express");

const fictionRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

module.exports = fictionRoutes;
