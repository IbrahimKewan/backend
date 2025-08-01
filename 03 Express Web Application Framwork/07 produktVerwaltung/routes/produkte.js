const express = require("express");
const router = express.Router();

let products = [
    {
        id: 101,
        name: "Kabellose Maus",
        description: "Ergonomische kabellose Maus mit USB-Empfänger",
        price: 24.99,
        currency: "EUR",
        inStock: true,
        category: "Elektronik",
    },
    {
        id: 102,
        name: "Mechanische Tastatur",
        description: "RGB-beleuchtete mechanische Tastatur mit blauen Switches",
        price: 69.9,
        currency: "EUR",
        inStock: false,
        category: "Elektronik",
    },
    {
        id: 103,
        name: "Kaffeemaschine",
        description: "Filterkaffeemaschine mit Timer und Thermoskanne",
        price: 49.95,
        currency: "EUR",
        inStock: true,
        category: "Haushalt",
    },
    {
        id: 104,
        name: "Bluetooth Lautsprecher",
        description: "Tragbarer Lautsprecher mit 12h Akkulaufzeit",
        price: 39.99,
        currency: "EUR",
        inStock: true,
        category: "Audio",
    },
];

// Alle Produkte anzeigen
router.get("/", (req, res) => {
    res.status(200).send(products);
});

// Einzelnes Produkt nach ID anzeigen
router.get("/:id", (req, res) => {
    const porductID = parseInt(req.params.id);
    const findIndex = products.findIndex((product) => product.id === porductID);
    if (findIndex >= 0) {
        res.status(201).json(products[findIndex]);
    }
    res.status(404).send("Produkt ID nicht gefunden");
});

// Neues produkte hinzufügen
router.post("/", (req, res) => {
    const data = req.body;
    const proID = parseInt(data.id);
    const isExist = products.find((product) => product.id === proID);
    if (isExist) {
        res.status(401).send(`Produkt ID:${proID} ist bereits vorhanden !!!`);
        return;
    }
    products.push(data);
    res.status(201).send("Produkt wurde hinzugefügt");
});

// produkt mit ID bearbeiten
router.put("/:id", (req, res) => {
    const product = req.body;
    const getID = parseInt(req.params.id);
    const index = products.findIndex((item) => item.id === getID);
    if (index >= 0) {
        products[index].name = product.name;
        products[index].category = product.category;
        products[index].description = product.description;
        products[index].price = product.price;
        products[index].currency = product.currency;
        products[index].inStock = product.inStock;
        res.status(201).send("Produkt wurde beabeitet");
    }
    res.status(404).send("Produckt nicht gefunden");
});

// produkt löschen
router.delete("/:id", (req, res) => {
    const getID = parseInt(req.params.id);
    const index = products.findIndex((product) => product.id === getID);
    if (index >= 0) {
        products.splice(index, 1);
        return res.send("antrag gelösct");
    }
    res.send("Id nicht gefunden");
});

// Produkte mit bestimmtem Namen suchen
router.get("/search/:name", (req, res) => {
    const proName = req.params.name;
    const findName = products.filter((pro) => pro.name === proName);
    if (findName.length > 0) {
        res.send(`
                produkte mit ID: ${findName[0].id} wurde gefunden
                name: ${findName[0].name}
                price: ${findName[0].price}
            `);
    }
});

module.exports = router;
