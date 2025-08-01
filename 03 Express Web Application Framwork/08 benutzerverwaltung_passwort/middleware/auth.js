const jwt = require("jsonwebtoken");
const geheim = "test1234";

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).send("Token Fehlt");

    jwt.verify(token, geheim, (err, user) => {
        if (err) return res.status(403).send("Token ungültig oder abgelaufen");
        res.user = user;
        next();
    });
}

module.exports = verifyToken;
