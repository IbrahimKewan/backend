const express = require("express");
const cors = require("cors");
const session = require("express-session");

// 1) Middleware
const { authenticated } = require("./middleware/auth");

// 2) Router (aus dem Ordner "router", nicht "routes")
const authRouter = require("./router/auth_users"); // /auth
const filmsRouter = require("./router/filmDB"); // /films
const generalRouter = require("./router/general"); // /

const app = express();
const PORT = 5000;
app.use(
    session({
        secret: "test",
        resave: true,
        saveUninitialized: true,
    })
);

app.use(cors());
app.use(express.json());

// öffentlich
app.use("/auth", authRouter);
app.use("/", generalRouter);

// geschützt
app.use("/films", authenticated, filmsRouter);

app.listen(PORT, () => {
    console.log(`server läuft: http://localhost:${PORT}`);
});
