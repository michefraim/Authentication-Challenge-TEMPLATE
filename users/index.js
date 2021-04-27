const { Router } = require("express");
const router = require("express").Router();
const { register, login, tokenValidate, logout, token } = require("./userRoutes");
const { tokenToUser } = require('../auth/token_validation')


router.post("/register", register);
router.post("/login", login);
router.post('/tokenValidate', tokenToUser,  tokenValidate);
router.post('/logout', logout);
router.post('/token', token);

module.exports = router;
