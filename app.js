const express = require("express");
const morgan = require("morgan");
const index = require('./api/users/index');
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
const INFORMATION = [];
const REFRESHTOKENS = [];


const app = express();
app.use(express.json());

app.use('/users', index);
morgan.token("body", (request, response) => JSON.stringify(request.body));
app.use(morgan(":body :method :url :response-time"));


const unknownEndpoint = (request, response) => {
  return response.status(404).send("unknown endpoint");
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
