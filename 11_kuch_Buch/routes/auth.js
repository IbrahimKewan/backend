const express = require("express");
const jwt = require("jsonwebtoken");
const { users } = require("../data/seeds");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

//=========================================================================
router.get("/ping", (_req, res) => {
    res.status(200).json({
        message: "auth pong",
    });
});

/**=========================================================================
 * Diese Funktion prüft ob username und password:
 *      - beides eingegeben sind
 *      - sind die string
 *      - haben vorgelegte länge
 *
 * @param {string} username Benutzername.
 * @param {string} password Pass.
 * @returns {object} {ok: true/false, username: user, password: pass}
 */
function UserPassInput(username, password) {
    const u = typeof username === "string" ? username.trim() : "";
    const p = typeof password === "string" ? password : "";

    if (!u || u.length < 4) {
        return {
            ok: false,
            status: 400,
            message: "Benutzername (min. 4) erforderlich",
        };
    }
    if (!p || p.length < 6) {
        return {
            ok: false,
            status: 400,
            message: "Passwort min.6 erforderlich!",
        };
    }
    return { ok: true, username: u, password: p };
}

//=========================================================================
router.post("/register", (req, res) => {
    const v = UserPassInput(req.body.username, req.body.password);
    if (!v.ok) {
        return res.status(v.status).json({ message: v.message });
    }

    const exists = users.find(
        (u) => u.username.toLowerCase() === v.username.toLowerCase()
    );
    if (exists) {
        return res.status(409).json({
            message: "Benutzer erforderlich",
            username: v.username,
        });
    }
    users.push({
        username: v.username,
        password: v.password,
        role: "user",
        favorites: [],
    });
    return res
        .status(201)
        .json({ message: "Registrierung erfolgreich", username: v.username });
});

//=========================================================================
router.post("/login", (req, res) => {
    const v = UserPassInput(req.body.username, req.body.password);
    if (!v.ok) {
        return res.status(v.status).json({ message: v.message });
    }

    const user = users.find(
        (u) => u.username.toLowerCase() === v.username.toLowerCase()
    );
    if (!user) {
        return res.status(401).json({
            message: "Ungültige Zugangsdaten",
        });
    }

    const token = jwt.sign({ username: v.username }, JWT_SECRET, {
        expiresIn: "1h",
    });
    req.session.authorization = {
        accessToken: token,
        username: v.username,
    };

    return res.status(201).json({
        message: "Login erfolgreich",
        token,
        username: user,
    });
});

//=========================================================================
router.post("/logout", (req, res) => {
    req.session.destroy(() =>
        res.status(200).json({
            message: "Logout erfolgreich",
        })
    );
});

module.exports = router;
