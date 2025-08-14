const express = require("express");
const { users, books } = require("../data/seeds");
const { type } = require("os");
const { off } = require("process");
const { authenticated } = require("../middleware/auth");
const router = express.Router();

router.get("/ping", (req, res) => {
    return res.status(200).json({
        message: "pong",
    });
});

router.get("/", (req, res) => {
    const { title, author, tag, year, limit, offset, sort, order } = req.query;
    let results = books;
    const has = (v) => typeof v === "string" && v.trim() !== "";
    const filtering = (name, value) => {
        return results.filter((x) =>
            x[name].toLowerCase().includes(value.toLowerCase())
        );
    };

    if (has(title)) {
        results = filtering("title", title);
    }
    if (has(author)) {
        results = filtering("author", author);
    }
    if (has(tag)) {
        results = results.filter((book) => {
            const b = book.tags;
            for (let index = 0; index < b.length; index++) {
                if (b[index].toLowerCase().includes(tag)) {
                    return b[index];
                }
            }
        });
    }
    if (has(year)) {
        results = results.filter((book) => book.year === Number(year));
    }

    const lim = Math.min(Number(limit) || 20, 50);
    const off = Math.max(Number(offset) || 0, 0);
    results = results.slice(off, off + lim);
    if (
        has(title) ||
        has(author) ||
        has(tag) ||
        has(limit) ||
        has(offset) ||
        has(year)
    ) {
        if (results.length <= 0) {
            return res.status(403).json({
                message: "kein Daten gefunden FILTER",
            });
        }
    }
    if (has(sort)) {
        if (sort === "year") {
            if (has(order) && order === "desc") {
                results = results.sort((a, b) => b.year - a.year);
            } else {
                results = results.sort((a, b) => a.year - b.year);
            }
        }
        if (sort === "title") {
            if (has(order) && order === "desc") {
                results = results.sort((a, b) =>
                    b.title.localeCompare(a.title)
                );
            } else {
                results = results.sort((a, b) =>
                    a.title.localeCompare(b.title)
                );
            }
        }
    }

    return res.status(200).json({
        message: "OK",
        books: results,
    });
});

router.get("/pingo", authenticated, (req, res) => {
    const username = req.user && req.user.username ? req.user.username : null;
    if (!username) {
        return res.status(401).json({
            message: "Benutzername nicht gefunden",
        });
    }
    return res.status(200).json({
        message: "OK eingelogt",
        username: username,
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;

    const book = books.find((book) => book.id === id);
    if (!book) {
        return res.status(404).json({
            message: "buch wurde nicht gefunden",
        });
    }

    return res.status(200).json({
        message: "OK",
        book,
    });
});

module.exports = router;
