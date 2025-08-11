const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");

const router = express.Router();
const geheim = "test";
let users = [
    {
        username: "test",
        password: "test123",
    },
];

router.get("/ping", (req, res) => res.send("users ping"));

router.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Benutzer name und password mussen eingegeben werden !!!",
        });
    }

    const isExist = users.find((user) => user.username === username);
    if (isExist) {
        return res.status(409).json({
            message: "Diese name ist schon vorhanden",
        });
    }

    users.push({ username: username, password: password });
    return res.status(201).json({
        message: "Anmeldung erfolgreich :)",
        username,
    });
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const isValid = users.find(
        (user) => user.username === username && user.password === password
    );
    if (!isValid) {
        return res.status(401).json({
            message: "password oder name ist falsch",
        });
    }

    const token = jwt.sign({ username }, geheim, { expiresIn: "1h" });
    req.session.authorization = {
        accessToken: token,
        username,
    };

    return res.status(200).json({
        message: "Anmelduung war erffolgreich",
        token,
        username,
    });
});

module.exports = router;
