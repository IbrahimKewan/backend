const express = require("express");
const { authenticated } = require("../middleware/auth");

const router = express.Router();

// ───────────────────────────────────────────────────────────────────────────────
let films = [
    {
        id: "1",
        title: "Inception",
        director: "Christopher Nolan",
        genre: "Sci-Fi",
        year: 2010,
        reviews: [
            { user: "alice", rating: 5, comment: "Mind-blowing!" },
            { user: "bob", rating: 4, comment: "Sehr gut, aber etwas komplex" },
        ],
    },
    {
        id: "2",
        title: "Interstellar",
        director: "Christopher Nolan",
        genre: "Sci-Fi",
        year: 2014,
        reviews: [],
    },
    {
        id: "3",
        title: "The Matrix",
        director: "Wachowski Sisters",
        genre: "Action/Sci-Fi",
        year: 1999,
        reviews: [{ user: "charlie", rating: 5, comment: "Ein Klassiker" }],
    },
];

// ───────────────────────────────────────────────────────────────────────────────
// Helpers
router.param("id", (req, res, next, id) => {
    const film = films.find((f) => f.id === id);
    if (!film)
        return res.status(404).json({ message: "Film-ID nicht gefunden" });
    req.film = film;
    next();
});

function validateReview(req, res, next) {
    let { rating, comment } = req.body;
    rating = Number(rating);
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
        return res
            .status(400)
            .json({ message: "rating muss eine Zahl von 1 bis 5 sein" });
    }
    if (comment !== undefined && typeof comment !== "string") {
        return res
            .status(400)
            .json({ message: "comment muss ein String sein" });
    }
    req.body.rating = rating;
    req.body.comment = (comment || "").trim();
    next();
}

function findOwnReviewIndex(film, username) {
    return film.reviews.findIndex((r) => r.user === username);
}

// ───────────────────────────────────────────────────────────────────────────────
// Öffentliche Endpunkte

// GET /films  (optional: title, director, genre)
router.get("/", (req, res) => {
    const { title, director, genre } = req.query;

    let results = films;
    const hasTitle = typeof title === "string" && title.trim() !== "";
    const hasDirector = typeof director === "string" && director.trim() !== "";
    const hasGenre = typeof genre === "string" && genre.trim() !== "";

    if (hasTitle) {
        const q = title.toLowerCase();
        results = results.filter((f) => f.title.toLowerCase().includes(q));
    }
    if (hasDirector) {
        const q = director.toLowerCase();
        results = results.filter((f) => f.director.toLowerCase().includes(q));
    }
    if (hasGenre) {
        const q = genre.toLowerCase();
        results = results.filter((f) => f.genre.toLowerCase().includes(q));
    }

    const usedAnyFilter = hasTitle || hasDirector || hasGenre;
    if (usedAnyFilter && results.length === 0) {
        return res
            .status(404)
            .json({ message: "Keine Filme gefunden", results: [] });
    }
    return res.status(200).json({ message: "Ok", results });
});

// GET /films/:id
router.get("/:id", (req, res) => {
    return res.status(200).json({ message: "Ok", film: req.film });
});

// ───────────────────────────────────────────────────────────────────────────────
// Geschützte Endpunkte (nur eingeloggte User)

// POST /films/:id/reviews
router.post("/:id/reviews", authenticated, validateReview, (req, res) => {
    const film = req.film;
    const username = req.user.username; // kommt aus authenticated
    const { rating, comment } = req.body;

    if (findOwnReviewIndex(film, username) !== -1) {
        return res.status(409).json({
            message: "Du hast für diesen Film bereits eine Bewertung abgegeben",
        });
    }
    film.reviews.push({ user: username, rating, comment });
    return res.status(201).json({ message: "Bewertung hinzugefügt", film });
});

// PUT /films/:id/reviews
router.put("/:id/reviews", authenticated, validateReview, (req, res) => {
    const film = req.film;
    const username = req.user.username;
    const { rating, comment } = req.body;

    const idx = findOwnReviewIndex(film, username);
    if (idx === -1) {
        return res.status(404).json({
            message: "Du hast für diesen Film keine Bewertung abgegeben",
        });
    }
    film.reviews[idx] = { user: username, rating, comment };
    return res.status(200).json({ message: "Bewertung aktualisiert", film });
});

// DELETE /films/:id/reviews
router.delete("/:id/reviews", authenticated, (req, res) => {
    const film = req.film;
    const username = req.user.username;

    const idx = findOwnReviewIndex(film, username);
    if (idx === -1) {
        return res.status(404).json({
            message: "Du hast für diesen Film keine Bewertung abgegeben",
        });
    }
    film.reviews.splice(idx, 1);
    return res.status(200).json({ message: "Bewertung gelöscht", film });
});

module.exports = router;
