const jwt = require("jsonwebtoken");
require("dotenv").config();
const geheim = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(404).send("Token nicht gefunden oder abgelaufen ");
    }
    jwt.verify(token, geheim, (err, user) => {
        if (err) {
            return res.send(err);
        }
        req.user = user;
        next();
    });
}

module.exports = verifyToken;
