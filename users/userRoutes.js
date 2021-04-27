"use strict";

const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { request, response } = require("express");
const { sign } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const { tokenToUser } = require("../auth/token_validation");
const ACCESS_TOKEN_SECRET = "ggwp1337";
const REFRESH_TOKEN_SECRET = "GME420";
const USERS = [
  {
    email: "admin@email.com",
    name: "admin",
    password: "$2b$10$yDsP12esYHm.6KyJjfV/5OSFZTODZdm9fPBCU2yYiPy5mUf1VsAeK",
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

  const hashedPassword = hashSync(body.password, genSaltSync(10));
  USERS.push({
    email: body.email,
    name: body.name,
    password: hashedPassword,
    isAdmin: false,
  });
  INFORMATION.push({ email: body.email, info: `${body.name} info` });
  console.log(INFORMATION);
  console.log(USERS);
  return response.status(201).send("Register Success");
};

const login = (request, response) => {
  const body = request.body;
  const currentUser = USERS.filter((user) => user.email === body.email)[0];

  if (!currentUser || currentUser.length === 0) {
    return response.status(404).send("cannot find user");
  }

  const isPasswordCorrect = compareSync(body.password, currentUser.password);

  if (isPasswordCorrect) {
    const dataInToken = {
      name: currentUser.name,
      email: currentUser.email,
      isAdmin: currentUser.isAdmin,
    };
    const accessToken = sign(dataInToken, ACCESS_TOKEN_SECRET, {
      expiresIn: "10s",
    });
    const refreshToken = sign(dataInToken, REFRESH_TOKEN_SECRET);
    REFRESHTOKENS.push(refreshToken);

    return response.status(200).json({
      accessToken,
      refreshToken,
      ...currentUser,
    });
  } else {
    return response.status(403).send("User or Password incorrect");
  }
};

const tokenValidate = (request, response, next) => {
  response.json({ valid: true });
};

const token = (request, response) => {
  const { token } = request.body;

  if (!token) {
    return response.status(401).send("Refresh Token Required");
  } else if (!REFRESHTOKENS.includes(token)) {
    return response.status(403).send("Invalid Refresh Token");
  }
  jwt.verify(token, REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return response.status(403).send("Invalid Refresh Token");
    }

    const accessToken = sign(decoded, ACCESS_TOKEN_SECRET, {
      expiresIn: "10s",
    });
    return response.status(200).json({ accessToken });
  });
};

const logout = (request, response) => {
  const { token } = request.body;

  if (!token) {
    return response.status(400).send("Refresh Token Required");
  }
  const refreshTokenIndex = REFRESHTOKENS.findIndex(
    (rToken) => rToken === token
  );

  if (refreshTokenIndex === -1) {
    return response.status(400).send("Invalid Refresh Token");
  }
  REFRESHTOKENS.splice(refreshTokenIndex, 1);
  return response.send("User Logged Out Successfully");
};

module.exports = {
  register,
  login,
  tokenValidate,
  logout,
  token,
  USERS,
  INFORMATION,
};
