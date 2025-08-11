const express = require("express");
const router = express.Router();

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

router.get("/", (req, res) => {
    const { title, director, genre } = req.query;
    let result = films;

    if (typeof title === "string" && title.trim() !== "") {
        const t = title.toLowerCase();
        result = result.filter((film) => film.title.toLowerCase().includes(t));
    }

    if (typeof director === "string" && director.trim() !== "") {
        const d = director.toLowerCase();
        result = result.filter((film) =>
            film.director.toLowerCase().includes(d)
        );
    }

    if (result.length <= 0) {
        return res.status(404).json({
            message: "Ihre filter ist leer !!!",
        });
    }

    return res.status(200).json({
        message: "Diese Film: ",
        film: result,
    });
});

router.get("/:id", (req, res) => {
    const filmID = req.params.id;
    const findFilm = films.find((f) => f.id === filmID);
    if (!findFilm) {
        return res.status(404).json({
            message: "film id not found",
        });
    }
    return res.status(200).json({
        message: "TEST",
        film: findFilm,
    });
});

router.post("/:id/reviews", (req, res) => {
    const filmID = req.params.id;
    const findFilm = films.find((f) => f.id === filmID);
    if (!findFilm) {
        return res.status(404).json({
            message: "film id not found",
        });
    }

    const username = req.session?.authorization?.username;
    if (!username) {
        return res.status(403).json({
            message: "Nicht eingelogt",
        });
    }

    let { rating, comment } = req.body;
    rating = Number(rating);
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
        return res.status(400).json({
            message: "rating muss eine Zahl von 1 bis 5 sien",
        });
    }
    if (comment !== undefined && typeof comment !== "string") {
        return res.status(400).json({
            message: "comment muss ein string sein",
        });
    }
    comment = (comment || "").trim();
    const already = findFilm.reviews.find((r) => r.user === username);
    if (already) {
        return res.status(409).json({
            message:
                "Du hast für deisen Film bereits eine Bewertung abgegeben !!",
        });
    }

    findFilm.reviews.push({
        user: username,
        rating,
        comment,
    });

    return res.status(200).json({
        message: "Bewertung hinzugefügt",
        findFilm,
    });
});

module.exports = router;
