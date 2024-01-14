require("dotenv").config();

const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const { authorization } = req.headers;

    console.log(authorization);

    if (!authorization) {
        return res.status(401).json({ error: "Authorisation token required" });
    }

    const token = authorization.split(" ")[1];

    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if (err) {
                res.redirect("/login");
            }

            console.log(decodedToken);
            next();
        });
    } else {
        return res.status(403).json({ error: "No token provided" });
    }
};

module.exports = authenticateToken;
