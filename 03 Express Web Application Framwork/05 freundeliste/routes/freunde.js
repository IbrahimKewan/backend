const express = require("express");
const router = express.Router();

let freunde = [
    {
        id: 1,
        name: "Ali",
        birthDay: "12.12.1999",
        city: "Tafas",
    },
];

// freunde anzeigen
router.get("/", (req, res) => {
    res.json(freunde);
});

//Freund hinzufügen !!!
router.post("/", (req, res) => {
    const neuerFreund = req.body;
    freunde.push(neuerFreund);
    res.status(201).json({
        message: "Freund hinzugefügt",
        freund: neuerFreund,
    });
});

// Freund löschen
router.delete("/", (req, res) => {
    const id = req.body.id;
    const index = freunde.findIndex((f) => f.id === id);
    if (index >= 0) {
        freunde.splice(index, 1);
        res.send(`Freund mit ID ${id} wurde gelöscht.`);
    } else {
        res.status(404).send("Freund nicht gefunden.");
    }
});

// Freund bearbeiten
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const FreundId = freunde.findIndex((freund) => freund.id === id);
    if (FreundId >= 0) {
        freunde[FreundId].name = req.body.name;
        freunde[FreundId].city = req.body.city;
        freunde[FreundId].birthDay = req.body.birthDay;
        res.status(201).send(`Freund daten wurden bearbeitet`);
    }
});

module.exports = router;
