const express = require("express");
const app = express();
const port = 3000;

const usersRoute = require("./routes/users");
app.use(express.json());
app.use("/users", usersRoute);

app.get("/", (req, res) => {
    res.send("Herzlich willkommen in benutzerverwaltung");
});

app.listen(port, () => {
    console.log(`Server läuft an http://localhost:${port}`);
});
