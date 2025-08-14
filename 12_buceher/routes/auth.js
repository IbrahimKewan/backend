const express = require("express");
const jwt = require("jsonwebtoken");
const { users } = require("../data/seeds");
const session = require("express-session");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

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
function checkUserPasss(username, password) {
    const u = typeof username === "string" && username.trim() !== "";
    const p = typeof password === "string" && password.trim() !== "";

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
    const { username, password } = req.body;

    const valid = checkUserPasss(username, password);
    if (!valid) {
        return res.status(valid.status).json({
            message: valid.message,
        });
    }

    const isExist = users.find(
        (user) => user.username.toLowerCase() === username.toLowerCase()
    );
    if (isExist) {
        return res.status(403).json({
            message: "Benutzer existiert schon bereits",
            username,
        });
    }
    users.push({
        username,
        password,
    });
    return res.status(201).json({
        message: "Registrierung war Erfolggreich :)",
        username,
    });
});

//=========================================================================
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const v = checkUserPasss(username, password);
    if (!v) {
        return res.status(valid.status).json({
            message: valid.message,
        });
    }

    const isExist = users.find(
        (user) =>
            user.username.toLowerCase() === username.toLowerCase() &&
            user.password === password
    );
    if (!isExist) {
        return res.status(404).json({
            message: "Ungültige eingabe!!!",
        });
    }

    const token = jwt.sign({ username: v.username }, JWT_SECRET, {
        expiresIn: "1h",
    });
    req.session.authorization = {
        accessToken: token,
        username: v.username,
    };
    return res.status(200).json({
        message: "Anmeldung war Erfolgreich...",
        token,
        username,
    });
});

router.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.status(200).json({
            message: "Sie sind abgemeldet",
        });
    });
});
module.exports = router;
