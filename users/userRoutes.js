"use strict";

const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const {tokenToUser} = require('../auth/token_validation')
const JWT_CODE = "ggwp1337";
const USERS = [
  {
    email: "michefraim@gmail.com",
    name: "Sadrik",
    password: "$2b$10$qUt6ccm.TBsSUmeJcTByj.W0xQA5tYoOVoPTzVrtXJA5pzREd31lC",
    isAdmin: true,
  },
];
const INFORMATION = [];
const REFRESHTOKENS = [];

const register = (request, response) => {
  const body = request.body;

  if (
    USERS.filter((user) => user.name === body.name || user.email === body.email)
      .length !== 0
  ) {
    return response.status(409).send("user already exists");
  }

  body.password = hashSync(body.password, genSaltSync(10));
  USERS.push({
    email: body.email,
    name: body.name,
    password: body.password,
    isAdmin: false,
  });
  INFORMATION.push({ email: body.email, name: body.name });
  // console.log(INFORMATION);
  //   console.log(USERS);
  return response.status(201).send("Register Success");
};

const login = (request, response) => {
  const body = request.body;
  console.log(body);
  const currentUser = USERS.filter((user) => user.email === body.email)[0];

  if (currentUser.length === 0) {
    return response.status(404).send("cannot find user");
  }

  const isPasswordCorrect = compareSync(body.password, currentUser.password);
  console.log("is password correct?", isPasswordCorrect);

  if (isPasswordCorrect) {
    currentUser.password = undefined;
    const jsonToken = sign({ result: currentUser }, JWT_CODE, {
      expiresIn: "1h",
    });
    return response.status(200).json({
      accessToken: jsonToken,
      refreshToken: null, // needs to be addressed
      email: currentUser.email,
      name: currentUser.name,
      isAdmin: currentUser.isAdmin,
    });
  } else {
    return response.status(403).send("User or Password incorrect");
  }
};

const tokenValidate = (request, response, next) => {
  let token = request.get("authorization");

  if (!token) {
    return response.status(401).send("Access Token Required");
  }
  // Remove Bearer from string
  token = token.slice(7);
  console.log(token);
  jwt.verify(token, JWT_CODE, (err, decoded) => {
    if (err) {
      return response.status(403).send("Invalid Access Token");
    } else {
      request.decoded = decoded;
      next();
    }
    return response.status(200).json({ valid: true });
  });
};

module.exports = {
  register,
  login,
  tokenValidate,
};
