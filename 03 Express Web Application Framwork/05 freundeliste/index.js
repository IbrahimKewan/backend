const express = require("express");
const app = express();
const port = 3000;
const freundeRoutes = require("./routes/freunde");

// Middleware zum Parsen von JSON
app.use(express.json());
app.use("/freunde", freundeRoutes);

// Start seite
app.get("/", (req, res) => {
    res.send("Willkommen zur Freundesliste !!!");
});

app.listen(port, () => {
    console.log(`Server läuft unter http://localhost:${port}`);
});
