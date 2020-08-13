const jwt = require("jsonwebtoken");

function verifyToken(req, res) {
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization.replace("Bearer ", ""),
      "secret_key",
      function (err, tokenUserData) {
        if (err) {
          return res.sendStatus(403);
        }
        console.log(tokenUserData, "header");
        return tokenUserData;
      }
    );
  }
}

module.exports = verifyToken;
