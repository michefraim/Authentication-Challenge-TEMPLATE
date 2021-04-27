"use strict";

const { USERS, INFORMATION } = require("../../users/userRoutes");

const information = (request, response) => {
  if (!request.user) {
    return response.status(403).send("Invalid Refresh Token")
  }
  const { email } = request.user;
  console.log(email);
  if (request.user) {
    const info = INFORMATION.find((info) => info.email === email);

    return response.json([{ email, info }]);
  } else {
    return response.status(500).send("error");
  }
};

const users = (request, response) => {
  if (!request.user) {
    return response.status(403).send("Invalid Refresh Token")
  }
  const { isAdmin } = request.user;
  console.log(isAdmin);
  if (!isAdmin) {
    return response.status(403).send("Invalid Access Token");
  }
  console.log(USERS);
  response.json(USERS);
};

module.exports = {
  information,
  users,
};
