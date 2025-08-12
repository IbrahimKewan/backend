const express = require("express");
const session = require("express-session");
const jwt = require("jsonwebtoken");

const router = express.Router();
const geheim = "test";

let users = [
    {
        username: "test",
        password: "test123",
    },
];

// testing reouter
router.get("/ping", (req, res) => {
    return res.status(200).json({
        message: "auth users PING",
    });
});

function userPassInput(user, pass) {
    const u = typeof user === "string" ? user.trim() : "";
    const p = typeof pass === "string" ? pass : "";

    if (!u || !p) {
        return {
            ok: false,
            status: 400,
            message: "Benutzername und Passwort sind erforderlich.",
        };
    }

    return {
        ok: true,
        username: u,
        password: p,
    };
}

// new user register
router.post("/register", (req, res) => {
    const { username, password } = req.body;

    // password und username sind pflicht
    const validierung = userPassInput(username, password);
    if (!validierung.ok) {
        return res.status(validierung.status).json({
            message: validierung.message,
        });
    }

    // ob der benutzer im system befindet
    const isExist = users.find(
        (user) =>
            user.username.toLowerCase() === validierung.username.toLowerCase()
    );
    if (isExist) {
        return res.status(409).json({
            message: "benutzer existiert schon andere name wählen !!",
        });
    }

    users.push({
        username: validierung.username,
        password: validierung.password,
    });
    return res.status(201).json({
        message: "Registrierung war erfolgreich :)",
        username: validierung.username,
    });
});

// login
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const validierung = userPassInput(username, password);
    if (!validierung.ok) {
        return res.status(validierung.status).json({
            message: validierung.message,
        });
    }

    const user = users.find(
        (user) =>
            user.username.toLowerCase() === validierung.username.toLowerCase()
    );
    if (!user || user.password !== validierung.password) {
        return res.status(401).json({
            message: "Ungültige Zugangsdaten",
        });
    }

    const token = jwt.sign({ username: user.username }, geheim, {
        expiresIn: "1h",
    });

    req.session.authorization = {
        accessToken: token,
        username: user.username,
    };

    return res.status(200).json({
        message: "Anmeldung erfolgreich",
        username: user.username,
        token,
    });
});

module.exports = router;
