const express = require("express");
const app = new express();
const port = 8080;

app.get("/", (req, res) => {
    return res.send("Hello World! just like that");
});

let server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
