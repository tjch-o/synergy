require("dotenv").config();

const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorisation token required" });
  }

  const token = authorization.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(403).json({ error: "No token provided" });
  }
};

module.exports = authenticateToken;
