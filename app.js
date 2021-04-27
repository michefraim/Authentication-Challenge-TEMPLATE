const express = require("express");
const morgan = require("morgan");
const users = require("./users/index");
const api = require("./api/index");
const { tokenToUser } = require("./auth/token_validation");

const app = express();
app.use(express.json());
morgan.token("body", (request, response) => JSON.stringify(request.body));
app.use(morgan(":body :method :url :response-time"));

app.use("/users", users);
app.use("/api", api);

app.options("/", tokenToUser, (request, response) => {
  let userOptions;
  if (!request.doesHaveToken) {
    userOptions = [
      {
        method: "post",
        path: "/users/register",
        description: "Register, Required: email, name, password",
        example: {
          body: { email: "user@email.com", name: "user", password: "password" },
        },
      },
      {
        method: "post",
        path: "/users/login",
        description: "Login, Required: valid email and password",
        example: { body: { email: "user@email.com", password: "password" } },
      },
    ];
    return response.json(userOptions);
  }

  if (!request.user) {
    userOptions = [
      {
        method: "post",
        path: "/users/register",
        description: "Register, Required: email, name, password",
        example: {
          body: { email: "user@email.com", name: "user", password: "password" },
        },
      },
      {
        method: "post",
        path: "/users/login",
        description: "Login, Required: valid email and password",
        example: { body: { email: "user@email.com", password: "password" } },
      },
      {
        method: "post",
        path: "/users/token",
        description: "Renew access token, Required: valid refresh token",
        example: { headers: { token: "*Refresh Token*" } },
      },
    ];
    return response.json(userOptions);
  }
  const { isAdmin } = request.user;

  if (isAdmin) {
    userOptions = [
      {
        method: "post",
        path: "/users/register",
        description: "Register, Required: email, name, password",
        example: {
          body: { email: "user@email.com", name: "user", password: "password" },
        },
      },
      {
        method: "post",
        path: "/users/login",
        description: "Login, Required: valid email and password",
        example: { body: { email: "user@email.com", password: "password" } },
      },
      {
        method: "post",
        path: "/users/token",
        description: "Renew access token, Required: valid refresh token",
        example: { headers: { token: "*Refresh Token*" } },
      },
      {
        method: "post",
        path: "/users/tokenValidate",
        description: "Access Token Validation, Required: valid access token",
        example: { headers: { Authorization: "Bearer *Access Token*" } },
      },
      {
        method: "get",
        path: "/api/v1/information",
        description: "Access user's information, Required: valid access token",
        example: { headers: { Authorization: "Bearer *Access Token*" } },
      },
      {
        method: "post",
        path: "/users/logout",
        description: "Logout, Required: access token",
        example: { body: { token: "*Refresh Token*" } },
      },
      {
        method: "get",
        path: "api/v1/users",
        description: "Get users DB, Required: Valid access token of admin user",
        example: { headers: { authorization: "Bearer *Access Token*" } },
      },
    ];
    return response.json(userOptions);
  }

  userOptions = [
    {
      method: "post",
      path: "/users/register",
      description: "Register, Required: email, name, password",
      example: {
        body: { email: "user@email.com", name: "user", password: "password" },
      },
    },
    {
      method: "post",
      path: "/users/login",
      description: "Login, Required: valid email and password",
      example: { body: { email: "user@email.com", password: "password" } },
    },
    {
      method: "post",
      path: "/users/token",
      description: "Renew access token, Required: valid refresh token",
      example: { headers: { token: "*Refresh Token*" } },
    },
    {
      method: "get",
      path: "/api/v1/information",
      description: "Access user's information, Required: valid access token",
      example: { headers: { Authorization: "Bearer *Access Token*" } },
    },
    {
      method: "post",
      path: "/users/logout",
      description: "Logout, Required: access token",
      example: { body: { token: "*Refresh Token*" } },
    },
    {
      method: "post",
      path: "/users/tokenValidate",
      description: "Access Token Validation, Required: valid access token",
      example: { headers: { Authorization: "Bearer *Access Token*" } },
    },
  ];
  return response.json(userOptions);
});

const unknownEndpoint = (request, response) => {
  return response.status(404).send("unknown endpoint");
};

// // handler of requests with unknown endpoint
app.use(unknownEndpoint);

module.exports = app;
