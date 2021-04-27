const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = "ggwp1337";

const tokenToUser = (request, response, next) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.slice(7);

  if (!token) {
    request.doesHaveToken = false;
  }else {
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        request.doesHaveToken = true;
      }
      request.doesHaveToken = true;
      request.user = decoded;
    });
  };
  next();
  }


module.exports = {
    tokenToUser
}