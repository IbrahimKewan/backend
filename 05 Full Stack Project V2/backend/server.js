const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Für Frontend-Zugriff
app.use(express.json());

const teilnehmerRoute = require("./routes/teilnehmer");
app.use("/teilnehmer", teilnehmerRoute);

app.get("/", (req, res) => {
    res.send("API läuft ✅");
});

app.listen(port, () => {
    console.log(`Backend läuft auf http://localhost:${port}`);
});
