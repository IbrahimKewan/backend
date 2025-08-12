const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "test";

function authenticated(req, res, next) {
    const auth = req.session && req.session.authorization;
    if (!auth || !auth.accessToken) {
        return res.status(403).json({
            message: "nicht eingelogt",
        });
    }

    const token = auth.accessToken;

    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(403).json({
                message: "Token unggültig oder abgelaufen !!!",
            });
        }
        req.user = {
            username: payload.username,
        };
        return next();
    });
}

module.exports = { authenticated };
