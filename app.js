const express = require("express");
const morgan = require("morgan");

const app = express();

const USERS = [
  {
    email: "michefraim@gmail.com",
    name: "Sadrik",
    password: "**hashed password**",
    isAdmin: true,
  },
  {
    email: "yoniSegev@gmail.com",
    name: "Yoni",
    password: "**hashed password**",
    isAdmin: false,
  },
  {
    email: "Alexi@gmail.com",
    name: "Alex",
    password: "**hashed password**",
    isAdmin: false,
  },
];
// const INFORMATION = [{ email, info }];
// const REFRESHTOKENS = [];

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(morgan(":body :method :url :response-time"));

// app.put('/api/persons/:id', (request, response, next) => {
//   const body = request.body;

//   if (Object.keys(body).length === 0) {
//     return response.status(400).send('Bad Request');
//   }

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// // handler of requests with unknown endpoint
app.use(unknownEndpoint);

// const errorHandler = (error, request, response, next) => {
//   console.error(error.message)

//   if (error.name === 'CastError') {
//     return response.status(400).send({ error: 'malformatted id' })
//   }

//   next(error)
// }

// // handler of requests with result to errors
// app.use(errorHandler);

module.exports = app;
