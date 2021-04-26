const { Router, response } = require("express");
const v1 = require("./v1");

const api = Router();

api.use("/v1", v1);

module.exports = api;