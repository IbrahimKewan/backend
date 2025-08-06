const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();
const geheim = process.env.JWT_SECRET;

let teilnehmer = [
    {
        id: 1,
        name: "Ali",
        email: "ali@example.com",
        birthDay: "2000-01-01",
        password: "$2b$10$.....", // ein gehashter Wert
        kurse: ["HTML", "CSS"],
    },
    {
        id: 2,
        name: "ibrkewan2",
        email: "ibrahimkewan0@gmail.com",
        birthDay: "1999-11-11",
        password: "Ibra96@@KKcout<<;", // ein gehashter Wert
        kurse: ["HTML", "CSS"],
    },
];

router.get("/", (req, res) => {
    res.status(200).json(teilnehmer);
});

router.get("/:id", (req, res) => {
    const userID = parseInt(req.params.id);
    const findUser = teilnehmer.find((user) => user.id === userID);
    if (!findUser) {
        return res.status(400).json({
            message: "Benutzer nicht gefunden",
        });
    }
    return res.status(200).json({
        id: findUser.id,
        name: findUser.name,
        email: findUser.email,
        kurse: findUser.kurse,
    });
});

router.post("/register", async (req, res) => {
    const getData = req.body;

    const isMailExist = teilnehmer.find((user) => user.email === getData.email);
    if (isMailExist) {
        return res
            .status(409)
            .send(`diese Email: ${getData.email} ist schon vorhanden!!!`);
    }

    const birthDay = new Date(getData.birthDay);
    const today = new Date();
    const age = today.getFullYear() - birthDay.getFullYear();
    const isTooYoung =
        age < 18 ||
        (age === 18 &&
            (today.getMonth() < birthDay.getMonth() ||
                (today.getMonth() === birthDay.getMonth() &&
                    today.getDate() < birthDay.getDate())));
    if (isTooYoung) {
        return res.status(500).send("Mindesalter 18 Jahre !!!");
    }
    debugger;
    const regex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const passWord = getData.password;
    if (!regex.test(passWord)) {
        return res
            .status(400)
            .json({ message: "Passwort muss mind. 8 Zeichen..." });
    }
    const salRounds = 10;
    let hashed;
    try {
        hashed = await bcrypt.hash(getData.password, salRounds);
    } catch (err) {
        return res.send("Problem beim hashing");
    }

    const maxID = Math.max(...teilnehmer.map((user) => user.id));
    const userID = maxID + 1;

    const newUser = {
        id: userID,
        name: getData.name,
        email: getData.email,
        password: hashed,
        kurse: getData.kurse,
    };

    teilnehmer.push(newUser);
    res.status(201).json({ message: "Registrierung erfolgreich!" });
});

router.post("/login", async (req, res) => {
    const data = req.body;

    const user = teilnehmer.find((user) => user.email === data.email);
    if (!user) {
        return res.status(401).json({ message: "Sie sind nicht registriert" });
    }

    const isPasswordCorrect = await bcrypt.compare(
        data.password,
        user.password
    );
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Falsches Passwort" });
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            kurse: user.kurse,
            birthDay: user.birthDay,
        },
        geheim,
        { expiresIn: "1h" }
    );

    res.status(200).json({
        message: "Anmeldung war erfolgreich",
        token: token,
        name: user.name,
        email: user.email,
    });
});

const verifyToken = require("../middleware/auth");
router.post("/mein-kurse", verifyToken, (req, res) => {
    const user = teilnehmer.find((u) => u.id === req.user.id);
    if (!user) {
        return res.send("Benutzer nicht gefunden");
    }
    res.status(200).json({
        id: user.id,
        email: user.email,
        kurse: user.kurse,
    });
});
module.exports = router;
