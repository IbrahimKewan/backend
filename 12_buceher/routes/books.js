const express = require("express");
const { users, books } = require("../data/seeds");
const { authenticated } = require("../middleware/auth");
const router = express.Router();

router.get("/ping", (req, res) => {
    return res.status(200).json({ message: "pong" });
});

router.get("/", authenticated, (req, res) => {
    const { title, author, tag, year, limit, offset, sort, order } = req.query;
    let results = books;
    const has = (v) => typeof v === "string" && v.trim() !== "";
    const filtering = (name, value) => {
        return results.filter((x) =>
            x[name].toLowerCase().includes(value.toLowerCase())
        );
    };

    if (has(title)) results = filtering("title", title);
    if (has(author)) results = filtering("author", author);
    if (has(tag)) {
        results = results.filter((book) =>
            book.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
        );
    }
    if (has(year))
        results = results.filter((book) => book.year === Number(year));

    if (has(sort)) {
        if (sort === "year") {
            results = results.sort((a, b) =>
                has(order) && order === "desc"
                    ? b.year - a.year
                    : a.year - b.year
            );
        }
        if (sort === "title") {
            results = results.sort((a, b) =>
                has(order) && order === "desc"
                    ? b.title.localeCompare(a.title)
                    : a.title.localeCompare(b.title)
            );
        }
    }

    const lim = Math.min(Number(limit) || 20, 50);
    const off = Math.max(Number(offset) || 0, 0);
    const paged = results.slice(off, off + lim);

    if (
        has(title) ||
        has(author) ||
        has(tag) ||
        has(limit) ||
        has(offset) ||
        has(year)
    ) {
        if (paged.length <= 0) {
            return res.status(404).json({
                message: "Kein Daten gefunden FILTER",
                errorCode: 404,
            });
        }
    }

    return res.status(200).json({
        message: "OK",
        results: paged,
        total: results.length,
    });
});

router.get("/pingo", authenticated, (req, res) => {
    const username = req.user && req.user.username ? req.user.username : null;
    if (!username) {
        return res.status(401).json({
            message: "Benutzername nicht gefunden",
            errorCode: 401,
        });
    }
    return res.status(200).json({
        message: "OK eingelogt",
        data: { username },
    });
});

function getBookById(id) {
    if (!id.includes("b")) id = `b${id}`;
    const book = books.find((b) => b.id === id);
    const index = books.findIndex((b) => b.id === id);
    if (!book) {
        return { status: 404, message: `Buch ID:${id} nicht gefunden` };
    }
    return { status: 200, index, book, id };
}

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const v = getBookById(id);
    if (v.status !== 200) {
        return res.status(v.status).json({
            message: v.message,
            errorCode: v.status,
        });
    }
    return res.status(200).json({
        message: "OK",
        data: v.book,
    });
});

router.post("/", authenticated, (req, res) => {
    const { title, author, year, tags } = req.body;
    const has = (v) => typeof v === "string" && v.trim() !== "";

    if (!has(title) || !has(author) || !year || !tags) {
        return res.status(400).json({
            message: "Alle Felder eingeben",
            errorCode: 400,
        });
    }

    const isExist = books.find(
        (book) =>
            book.author === author && book.year === year && book.title === title
    );
    if (isExist) {
        return res.status(409).json({
            message: "Dieses Buch existiert bereits!",
            errorCode: 409,
            data: isExist,
        });
    }
    const bookIds = books.map((b) => Number(b.id.substring(1)));
    let maxID = Math.max(...bookIds) + 1;
    maxID = `b${maxID}`;
    const newBook = {
        id: maxID,
        title,
        author,
        year,
        tags,
        reviews: [],
    };
    books.push(newBook);

    return res.status(201).json({
        message: "Buch wurde erfolgreich hinzugefügt :)",
        data: newBook,
    });
});

router.put("/:id", authenticated, (req, res) => {
    const { title, author, year, tags } = req.body;
    let id = req.params.id;

    const v = getBookById(id);
    if (v.index < 0) {
        return res.status(v.status).json({
            message: v.message,
            errorCode: v.status,
        });
    }

    if (typeof title === "string" && title.trim() !== "") {
        books[v.index].title = title;
    }
    if (typeof author === "string" && author.trim() !== "") {
        books[v.index].author = author;
    }
    if (typeof year !== "undefined" && year !== null) {
        books[v.index].year = year;
    }
    if (typeof tags !== "undefined" && tags !== null) {
        books[v.index].tags = tags;
    }

    return res.status(200).json({
        message: "OK",
        data: books[v.index],
    });
});

router.delete("/:id", authenticated, (req, res) => {
    let id = req.params.id;
    const v = getBookById(id);
    if (v.index < 0) {
        return res.status(v.status).json({
            message: v.message,
            errorCode: v.status,
        });
    }
    books.splice(v.index, 1);
    return res.status(200).json({
        message: `Buch mit ID: ${id} wurde erfolgreich gelöscht :)`,
    });
});

router.post("/:id/reviews", authenticated, (req, res) => {
    const { rating, comment } = req.body;
    const id = req.params.id;
    const v = getBookById(id);
    if (v.index < 0) {
        return res.status(v.status).json({
            message: v.message,
            errorCode: v.status,
        });
    }
    const username = req.user.username;
    const has = (p) => typeof p === "string" && p.trim() !== "";
    if (!rating || !has(comment)) {
        return res.status(400).json({
            message: "Bewertung und Kommentar sind Pflichtfelder!",
            errorCode: 400,
        });
    }
    if (rating < 0 || rating > 10) {
        return res.status(400).json({
            message: "Bewertungsbereich [0 ... 10]",
            errorCode: 400,
        });
    }
    const book = books[v.index];
    const review = book.reviews.find((r) => r.user === username);
    if (review) {
        return res.status(409).json({
            message: "Sie haben schon für dieses Buch bewertet.",
            errorCode: 409,
        });
    }
    book.reviews.push({ user: username, rating, comment });
    return res.status(200).json({
        message: "Sie haben Ihre Bewertung erfolgreich abgegeben",
        data: book,
    });
});

router.put("/:id/reviews", authenticated, (req, res) => {
    let { rating, comment } = req.body;
    const id = req.params.id;
    const v = getBookById(id);
    if (v.index < 0) {
        return res.status(v.status).json({
            message: v.message,
            errorCode: v.status,
        });
    }
    const username = req.user.username;
    if (rating < 0 || rating > 10) {
        return res.status(400).json({
            message: "Bewertungsbereich [0 ... 10]",
            errorCode: 400,
        });
    }
    const book = books[v.index];
    const reviewIndex = book.reviews.findIndex((r) => r.user === username);
    if (reviewIndex === -1) {
        return res.status(409).json({
            message: "Sie haben keine Bewertung für dieses Buch abgegeben.",
            errorCode: 409,
        });
    }
    if (!rating || rating <= 0) {
        rating = book.reviews[reviewIndex].rating;
    }

    // Korrektur: Nur trimmen, wenn comment ein String ist
    if (typeof comment !== "string" || comment.trim() === "") {
        comment = book.reviews[reviewIndex].comment;
    }

    book.reviews[reviewIndex] = { user: username, rating, comment };
    return res.status(200).json({
        message: "Sie haben Ihre Bewertung erfolgreich aktualisiert",
        data: book,
    });
});

router.delete("/:id/reviews", authenticated, (req, res) => {
    const id = req.params.id;
    const username = req.user.username;
    const v = getBookById(id);
    if (v.index < 0) {
        return res.status(v.status).json({
            message: v.message,
            errorCode: v.status,
        });
    }
    const book = books[v.index];
    const reviewIndex = book.reviews.findIndex((r) => r.user === username);
    if (reviewIndex === -1) {
        return res.status(409).json({
            message: "Sie haben keine Bewertung für dieses Buch abgegeben.",
            errorCode: 409,
        });
    }
    book.reviews.splice(reviewIndex, 1);
    return res.status(200).json({
        message: "Sie haben Ihre Bewertung erfolgreich gelöscht",
        data: book,
    });
});

module.exports = router;
