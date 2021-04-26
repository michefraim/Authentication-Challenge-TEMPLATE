const { Router } = require("express");
const router = require("express").Router();
const { information, users, } = require("./v1Routes");
const { tokenToUser } = require('../../auth/token_validation')

router.get("/information", tokenToUser,  information);
router.get("/users", users);

module.exports = router;
