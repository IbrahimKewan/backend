const express = require("express");
const route = express.Router();

let users = [
    {
        id: 1,
        name: "Anna Müller",
        email: "anna.mueller@example.com",
        role: "admin",
    },
    {
        id: 2,
        name: "Ben Schmidt",
        email: "ben.schmidt@example.com",
        role: "user",
    },
    {
        id: 3,
        name: "Carla Weber",
        email: "carla.weber@example.com",
        role: "moderator",
    },
    {
        id: 4,
        name: "David Fischer",
        email: "david.fischer@example.com",
        role: "user",
    },
];

// Alle benutzern anzeigen
route.get("/", (req, res) => {
    debugger;
    res.status(201).send(users);
});

// Einzelen Benutzer holen
route.get("/:id", (req, res) => {
    const userID = parseInt(req.params.id);
    const filterUsers = users.filter((user) => user.id === userID);
    if (filterUsers.length > 0) {
        res.status(201).send(
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
route.post("/", (req, res) => {
    const user = req.body;
    const isExist = users.find((x) => x.id === user.id);
    if (isExist) res.status(401).send(`Diese ID ist schon vorhanden !!!`);
    else {
        users.push(user);
        res.status(201).send(`Neue Bneutzer erfölgreich hinzugefügt `);
    }
});

// PUT	/:id	Bestehenden Benutzer ändern
route.put("/:id", (req, res) => {
    const userID = parseInt(req.body.id);
    const userUpdate = req.body;
    const findUser = users.findIndex((user) => user.id === userID);
    if (findUser >= 0) {
        users[findUser].name = userUpdate.name;
        users[findUser].email = userUpdate.email;
        users[findUser].role = userUpdate.role;
        res.status(201).send(
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

module.exports = route;
