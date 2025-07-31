const express = require("express");
const app = express();
const port = 3000;
const usersRoute = require("./routes/users");

app.use(express.json());
app.use("/users", usersRoute);

app.get("/", (req, res) => {
    res.status(200).send("Herzlich willkommen in Benutzer verwaltungsAPP");
});

app.listen(port, () => {
    console.log(`server läuft auf http://localhost:${port}`);
});
