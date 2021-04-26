const { Router } = require("express");
const router = require("express").Router();
const { register, login, tokenValidate } = require("./userRoutes");

router.post("/register", register);
router.post("/login", login);
router.post('/tokenValidate',tokenValidate);

module.exports = router;
