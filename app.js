const express = require("express");
const morgan = require("morgan");
const users = require("./users/index");
const api = require("./api/index")
// const { checkToken } = require("./auth/token_validation");

const app = express();
app.use(express.json());

app.use("/users", users);
app.use("/api", api)
morgan.token("body", (request, response) => JSON.stringify(request.body));
app.use(morgan(":body :method :url :response-time"));
// app.use(checkToken());

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
