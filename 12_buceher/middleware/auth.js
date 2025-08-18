const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt";

function authenticated(req, res, next) {
    let token = req.session?.authorization?.accessToken;
    if (!token) {
        const authHeader = req.headers.authorization;
        token = authHeader && authHeader.split(" ")[1];
    }
    if (!token) {
        return res.status(401).json({
            message: "Nicht eingelogt !!!",
        });
    }

    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(403).json({
                message: "Token ungültig oder abgelaufen",
            });
        }
        req.user = {
            username: payload.username,
        };
        next();
    });
}

module.exports = { authenticated };
