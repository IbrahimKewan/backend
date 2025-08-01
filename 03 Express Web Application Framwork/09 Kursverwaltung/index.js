const express = require("express");
const app = express();

const port = 3000;

const userRoute = require("./route/teilnehmer");
app.use(express.json());
app.use("/teilnehmer", userRoute);

app.get("/", (req, res) => {
    res.send("Willkommen in unsere Kurs");
});

app.listen(port, () => {
    console.log(`server läuft an http://localhost:${port}`);
});
