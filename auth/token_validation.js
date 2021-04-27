const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = "ggwp1337";

const tokenToUser = (request, response, next) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.slice(7);

  if (!token) {
    return response.status(401).send("Access Token Required");
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return response.status(403).send("Invalid Access Token");
    }
    request.user = decoded;
    next();
  });
  };

module.exports = {
    tokenToUser
}