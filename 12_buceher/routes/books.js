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

function getBookById(id) {
    if (!id.includes("b")) {
        id = `b${id}`;
    }
    const book = books.find((b) => b.id === id);
    const index = books.findIndex((b) => b.id === id);
    let status, message;

    if (!book) {
        message = `Buch ID:${id} nicht gefunden`;
        status = 404;
        return { status, message };
    }
    return { status: 200, index, book, id };
}

router.get("/:id", (req, res) => {
    const id = req.params.id;

    const v = getBookById(id);
    if (v.status !== 200) {
        return res.status(v.status).json({
            message: v.message,
        });
    }

    return res.status(v.status).json({
        message: "OK",
        book: v.book,
    });
});

router.post("/", authenticated, (req, res) => {
    const { title, author, year, tags } = req.body;
    const has = (v) => typeof v === "string" && v.trim() !== "";

    if (!has(title) || !has(author) || !year || !tags) {
        return res.status(400).json({
            message: "Alle Felder eingeben ",
            title,
            author,
            year,
            tags,
        });
    }

    const isExist = books.find(
        (book) =>
            book.author === author && book.year === year && book.title === title
    );
    if (isExist) {
        return res.status(403).json({
            message: "Diese Buch ist schon existiert !!!",
            book: isExist,
        });
    }
    const book = books.map((b) => b.id.substring(1, 99));
    let maxID = Math.max(...book) + 1;
    maxID = `b${maxID}`;
    const newBook = {
        id: maxID,
        title,
        author,
        year,
        tags,
    };
    books.push(newBook);

    return res.status(201).json({
        message: "Buch wurde erfolgreich hinzugefügt :)",
        book: newBook,
    });
});

router.put("/:id", authenticated, (req, res) => {
    const { title, author, year, tags } = req.body;
    let id = req.params.id;

    const v = getBookById(id);
    if (v.index < 0) {
        return res.status(v.status).json({
            message: v.message,
        });
    }

    const index = v.index;
    books[index].title = title;
    books[index].author = author;
    books[index].year = year;
    books[index].tags = tags;

    return res.status(v.status).json({
        message: "OK",
        book: books[index],
    });
});

router.delete("/:id", authenticated, (req, res) => {
    let id = req.params.id;

    const v = getBookById(id);
    if (v.index < 0) {
        return res.status(v.status).json({
            message: v.message,
        });
    }

    books.splice(v.index, 1);
    return res.status(v.status).json({
        message: `Buch mit ID: ${id} wurde erfolgreich gelöscht :)`,
    });
});

router.post("/:id/reviews", authenticated, (req, res) => {
    const { user, rating, comment } = req.body;
    const id = req.params.id;

    const v = getBookById(id);
    if (v.index < 0) {
        return res.status(v.status).json({
            message: v.message,
        });
    }

    const username = req.user.username;
    const has = (p) => typeof p === "string" && p.trim() !== "";
    if (!rating || !has(comment)) {
        return res.status(404).json({
            message: "Bewertung und kommintare sind pflicht felder !!!",
        });
    }

    if (rating < 0 || rating > 10) {
        return res.status(400).json({
            message: "Bewertungsberiech [0 ... 10]",
        });
    }

    const book = books.find((b) => b.id === v.id);
    const review = book.reviews.find((r) => r.user === username);
    if (review) {
        return res.status(409).json({
            message: "Sie haben schon für dieses Buch Bewertung abgegeben ",
        });
    }

    book.reviews.push({
        user: username,
        rating,
        comment,
    });
    // books.push(book);
    return res.status(200).json({
        message: "Sie haben Ihre Bwertung erfolgreich abgebgeben",
        book: book,
    });
});

router.put("/:id/reviews", authenticated, (req, res) => {
    const { user, rating, comment } = req.body;
    const id = req.params.id;

    const v = getBookById(id);
    if (v.index < 0) {
        return res.status(v.status).json({
            message: v.message,
        });
    }

    const username = req.user.username;

    if (rating < 0 || rating > 10) {
        return res.status(400).json({
            message: "Bewertungsberiech [0 ... 10]",
        });
    }

    const book = books.find((b) => b.id === v.id);
    const review = book.reviews.find((r) => r.user === username);
    if (!review) {
        return res.status(409).json({
            message: "Sie haben kein bewertung für dieses Buch abgegeben ",
        });
    }

    const ReIndex = book.reviews.findIndex((r) => r.user === username);
    book.reviews.splice(ReIndex, 1);

    book.reviews[ReIndex] = {
        user: username,
        rating,
        comment,
    };
    return res.status(200).json({
        message: "Sie haben Ihre Bwertung erfolgreich abgebgeben",
        book: book,
    });
});

router.delete("/:id/reviews", authenticated, (req, res) => {
    const id = req.params.id;
    const username = req.user.username;

    const v = getBookById(id);
    if (v.index < 0) {
        return res.status(v.status).json({
            message: v.message,
        });
    }

    const book = books.find((b) => b.id === v.id);
    const review = book.reviews.find((r) => r.user === username);
    if (!review) {
        return res.status(409).json({
            message: "Sie haben kein bewertung für dieses Buch abgegeben ",
        });
    }

    const ReIndex = book.reviews.findIndex((r) => r.user === username);
    book.reviews.splice(ReIndex, 1);

    return res.status(200).json({
        message: "Sie haben Ihre Bwertung erfolgreich gelöscht",
        book: book,
    });
});
module.exports = router;
