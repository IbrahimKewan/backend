const express = require("express");
const { authenticated } = require("../middleware/auth");
const { recipes, avgRating } = require("../data/recipes");
const { users } = require("../data/seeds");
const { timeLog } = require("console");

const router = express.Router();

// Param loader
router.param("id", (req, res, next, id) => {
    const rec = recipes.find((r) => r.id === id);
    if (!rec) {
        return res.status(404).json({
            message: "Rezept nicht gefunden",
        });
    }
    req.recipes = rec;
    next();
});

router.get("/", (req, res) => {
    const { title, autor, order, time } = req.query;

    let results = recipes.map((r) => ({
        ...r,
        avgRating: avgRating(r),
        ratingCount: r.ratings.length,
    }));

    const has = (v) => typeof v === "string" && v.trim() !== "";
    if (has(title)) {
        results = results.filter((r) =>
            r.title.toLowerCase().includes(title.toLowerCase())
        );
    }

    if (has(time)) {
        const t = Number(time);
        results = results.filter((r) => r.time <= t);
    }
    return res.status(200).json({
        message: "OK",
        results: results,
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const recipe = recipes.find((r) => r.id === id);
    if (!recipe) {
        return res.status(404).json({
            message: "ID nicht gefunden",
            id,
        });
    }

    return res.status(200).json({
        message: "OK",
        recipe: recipe,
    });
});

router.post("/", authenticated, (req, res) => {
    const { title, steps, ingredients, time, tags } = req.body;
    let author = req.user.username;

    const max = Math.max(...recipes.map((r) => parseInt(r.id.slice(1), 10)));
    const id = `r${max + 1}`;
    let right = true;

    if (steps.length <= 0) {
        right = false;
    }
    if (ingredients.length <= 0) {
        right = false;
    }
    if (!right) {
        return res.status(403).json({
            message: "Falsche eingaben!!!",
            title,
            steps,
            ingredients,
            time,
            tags,
        });
    }
    recipes.push({
        id,
        title,
        author,
        steps,
        ingredients,
        time,
        tags,
    });

    return res.status(201).json({
        message: "OK",
        recipes,
    });
});

router.put("/:id", authenticated, (req, res) => {
    const username = req.user.username;
    const { title, steps, ingredients, time, tags } = req.body;
    let id = req.params.id;

    if (recipes.author !== req.user.username) {
        return res.status(403).json({
            message: "Kein Berichtigung ",
        });
    }
    if (!username) {
        return res.status(409).json({
            message: "Sie sind nicht angemeldet !!!",
        });
    }
    if (!id) {
        return res.status(404).json({
            message: "geben Sie ihre ID ein!!!",
        });
    }
    id = `r${id}`;
    const findID = recipes.find((r) => r.id === id);
    if (!findID) {
        return res.status(400).json({
            message: "Diese Rezept ID existiert nicht ",
        });
    }

    const update = req.body || {};
    if (update.title) recipes.title = String(update.title).trim();
    if (Number.isFinite(Number(update.time)))
        recipes.time = Number(update.time);

    return res.status(200).json({
        message: "OK",
        recipes,
    });
});
module.exports = router;
