const express = require("express");
const session = require("express-session");
const cros = require("cors");

const auth_users = require("./router/auth_users");
// const general = require("./router/general");
const filmsDB = require("./router/filmsDB");

const PORT = 5000;
const app = express();

app.use(
    session({
        secret: "test",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cros());
app.use(express.json());

app.use("/auth", auth_users);
// app.use("/", general);
app.use("/films", filmsDB);

app.listen(PORT, () => {
    console.log(`Server läuft an: http://localhost:${PORT}`);
});
