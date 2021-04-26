"use strict";

const information = (request, response) => {
  if(request.decoded){
    return response.status(200).json({email: request.decoded.result.email, name: request.decoded.result.name});
} else {
    return response.status(500).send("error");
}
};

const users = (request, response) => {};

module.exports = {
  information,
  users,
};
