const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const route = express.Router();

const salRounds = 10;
let users = [
    {
        id: 1,
        name: "Anna Müller",
        email: "anna.mueller@example.com",
        password:
            "$2b$10$KbpOMVmtAOEpEJC29lAFueN7kurui0Z1xYpH6XPBBJyVmZtrFibwK",
        role: "admin",
    },
    {
        id: 2,
        name: "Ben Schmidt",
        email: "ben.schmidt@example.com",
        password:
            "$2b$10$neQiCSf16gOV15Kt3oD2wO9nlnS4JGvMzRd2XTcK6Nie7NnSsX4gK",
        role: "user",
    },
    {
        id: 3,
        name: "Carla Weber",
        email: "carla.weber@example.com",
        password:
            "$2b$10$Q3U1MGzLb3/bB2TQYX.g3u/qu16oiLHmcSCNwULcz0hDl4S4.ItHe",
        role: "moderator",
    },
    {
        id: 4,
        name: "David Fischer",
        email: "david.fischer@example.com",
        password:
            "$2b$10$fu1Ykt7KsAENng4TXsYw.OkTIKFaXOM7ujjNTPaieI9pGzGTqsxi6",
        role: "user",
    },
];

(async () => {
    for (let user of users) {
        if (!user.password.startsWith("$2b$")) {
            user.password = await bcrypt.hash(user.password, salRounds);
        }
    }
})();
// Alle benutzern anzeigen
route.get("/", (req, res) => {
    debugger;
    res.status(200).send(users);
});

// Einzelen Benutzer holen
route.get("/:id", (req, res) => {
    const userID = parseInt(req.params.id);
    const filterUsers = users.filter((user) => user.id === userID);
    if (filterUsers.length > 0) {
        return res.status(200).send(
            `
            Benutzer gefunden !!! :),\n
            Name: ${filterUsers[0].name}\n
            email: ${filterUsers[0].email}\n
            `
        );
    } else {
        res.status(404).send("nicht gefunden");
    }
});

// POST	/	Neuen Benutzer hinzufügen
route.post("/", async (req, res) => {
    const user = req.body;
    if (!user.name || !user.email || !user.password) {
        return res
            .status(400)
            .send("Name, E-Mail und Passwort sind erforderlich");
    }

    // Email check
    const email = user.email;
    const isMailExist = users.find((user) => user.email === email);
    if (isMailExist)
        return res
            .status(409)
            .send("mit diesem email wurde schon bereits angemeldet");

    // ID check
    const isExist = users.find((x) => x.id === user.id);
    if (isExist)
        return res.status(409).send(`Diese ID ist schon vorhanden !!!`);
    try {
        const hashedPassword = await bcrypt.hash(user.password, salRounds);
        user.password = hashedPassword;
        users.push(user);
        res.status(201).send(`Neue Bneutzer erfölgreich hinzugefügt `);
    } catch (err) {
        res.status(500).send("Fehler beim Passwort-Hashing");
    }
});

// PUT	/:id	Bestehenden Benutzer ändern
route.put("/:id", async (req, res) => {
    const userID = parseInt(req.params.id);
    const userUpdate = req.body;
    const findUser = users.findIndex((user) => user.id === userID);
    if (findUser >= 0) {
        users[findUser].name = userUpdate.name;
        users[findUser].email = userUpdate.email;
        users[findUser].role = userUpdate.role;
        users[findUser].password = await bcrypt.hash(
            userUpdate.password,
            salRounds
        );
        res.status(200).send(
            `Benutzer mit diesem ID: ${userID} wurde bearbeitet`
        );
    } else {
        res.status(404).send(
            `Benutzer mit diesem ID: ${userID} nicht gefunden`
        );
    }
});

// DELETE	/:id	Benutzer löschen
route.delete("/:id", (req, res) => {
    const userID = parseInt(req.params.id);
    const findUser = users.findIndex((user) => user.id === userID);
    if (findUser >= 0) {
        users.splice(findUser, 1);
        return res.status(201).send("Benutzer daten wurden gelöscht");
    }
    res.status(404).send("Benutzer wurde nicht gefunden ");
});

// registrieren
route.post("/register", async (req, res) => {
    const daten = req.body;

    const checkMail = users.find((user) => user.email === daten.email);
    if (checkMail) return res.send("E-Mail ist bereits vorhanden !!! ");

    const regex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = regex.test(daten.password);
    if (!validPassword) {
        return res.send(
            "Password muss min. 8 Zeichen und groß/klein buchstaben und sonder zeichen inhalten !!!"
        );
    }

    const birthDay = new Date(daten.birthDay);
    const today = new Date();
    const age = today.getFullYear() - birthDay.getFullYear();
    const isTooYoung =
        age < 18 ||
        (age === 18 &&
            (today.getMonth() < birthDay.getMonth() ||
                (today.getMonth() === birthDay.getMonth() &&
                    today.getDate() < birthDay.getDate())));
    if (isTooYoung) {
        return res.send("Du musst mindestens 18 Jahre alt sein.");
    }

    const hashed = await bcrypt.hash(daten.password, salRounds);

    // const maxID = users.reduce((speicher, aktElem) => {
    //     return aktElem.id > speicher ? aktElem.id : speicher;
    // }, 0);

    const maxID = Math.max(...users.map((user) => user.id));
    const id = maxID + 1;
    const newUser = {
        id: id,
        name: daten.name,
        email: daten.email,
        password: hashed,
        birthDay: daten.birthDay,
        role: "user",
    };
    users.push(newUser);
    res.send("Sie haben erfolgreich regestriert :)");
});

// LOGIN
const geheim = "test12345";
route.post("/login", async (req, res) => {
    const data = req.body;

    // Ist der Mail in die Liste?
    const user = users.find((user) => user.email === data.email);
    if (!user) {
        return res.send("Falsche Email adresse oder sie sind nicht eingelogt");
    }

    // Ist dasselbe passwort ?
    const isPasswordCorrect = await bcrypt.compare(
        data.password,
        user.password
    );
    if (!isPasswordCorrect) {
        return res.status(401).send("Falsches Passwort");
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        geheim,
        { expiresIn: "1h" }
    );

    res.status(200).json({
        message: "Login erfolgreich",
        token: token,
    });
});

const verifyToken = require("./middleware/auth");
route.get("/profile", verifyToken, (req, res) => {
    const user = users.find((u) => u.id === req.user.id);
    if (!user) return res.status(404).send("Benutzer nicht gefunden");

    res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    });
});

module.exports = route;
