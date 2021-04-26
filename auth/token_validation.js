const jwt = require("jsonwebtoken");
const JWT_CODE = "ggwp1337";

const tokenToUser = (request, response, next) => {
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
  });
  };

module.exports = {
    tokenToUser
}