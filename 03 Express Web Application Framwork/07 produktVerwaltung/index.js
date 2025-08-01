const express = require("express");
const app = express();
const port = 3000;

const productRoute = require("./routes/produkte");

app.use(express.json());
app.use("/produkte", productRoute);

app.get("/", (req, res) => {
    res.send("Herzlich Wilkommen in Produktverwaltungsapp :) ");
});

app.listen(port, () => {
    console.log(`Server läuft -> http://localhost:${port}`);
});
