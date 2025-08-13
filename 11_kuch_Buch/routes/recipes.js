const express = require("express");
const { authenticated } = require("../middleware/auth");
const { recipes, avgRating, users } = require("../data/seeds");

const router = express.Router();

// Param loader
router.param("id", (req, res, next, id) => {
    const rec = recipes.find((r) => r.id === id);
    if (!rec) return res.status(404).json({ message: "Rezept nicht gefunden" });
    req.recipe = rec;
    next();
});

// GET /recipes (öffentlich) – Filter+Sort+Pagination (leicht)
router.get("/", (req, res) => {
    const {
        title,
        tag,
        author,
        ingredient,
        maxTime,
        sort,
        order,
        limit,
        offset,
    } = req.query;

    let results = recipes.map((r) => ({
        ...r,
        avgRating: avgRating(r),
        ratingCount: r.ratings.length,
    }));

    const has = (v) => typeof v === "string" && v.trim() !== "";
    if (has(title))
        results = results.filter((r) =>
            r.title.toLowerCase().includes(title.toLowerCase())
        );
    if (has(tag))
        results = results.filter((r) =>
            r.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
        );
    if (has(author))
        results = results.filter((r) =>
            r.author.toLowerCase().includes(author.toLowerCase())
        );
    if (has(ingredient))
        results = results.filter((r) =>
            r.ingredients.some((i) =>
                i.name.toLowerCase().includes(ingredient.toLowerCase())
            )
        );
    if (has(maxTime))
        results = results.filter((r) => r.time <= Number(maxTime));

    // simple sort
    const s =
        sort === "title" || sort === "time" || sort === "rating" ? sort : null;
    const o = order === "desc" ? -1 : 1;
    if (s) {
        results.sort((a, b) => {
            const A = s === "rating" ? a.avgRating : a[s];
            const B = s === "rating" ? b.avgRating : b[s];
            if (A < B) return -1 * o;
            if (A > B) return 1 * o;
            return 0;
        });
    }

    // pagination
    const L = Math.min(Number(limit) || results.length, 50);
    const O = Number(offset) || 0;
    const page = results.slice(O, O + L);

    if (
        (has(title) ||
            has(tag) ||
            has(author) ||
            has(ingredient) ||
            has(maxTime)) &&
        page.length === 0
    ) {
        return res
            .status(404)
            .json({ message: "Keine Rezepte gefunden", results: [] });
    }
    return res
        .status(200)
        .json({ message: "Ok", results: page, total: results.length });
});

// GET /recipes/:id (öffentlich)
router.get("/:id", (req, res) => {
    const r = req.recipe;
    return res.status(200).json({
        message: "Ok",
        data: { ...r, avgRating: avgRating(r), ratingCount: r.ratings.length },
    });
});

// POST /recipes (geschützt)
router.post("/", authenticated, (req, res) => {
    const { title, steps, ingredients, time, tags } = req.body;
    if (
        !title ||
        !Array.isArray(steps) ||
        steps.length < 1 ||
        !Array.isArray(ingredients) ||
        ingredients.length < 1 ||
        !Number.isFinite(Number(time))
    ) {
        return res.status(400).json({ message: "Ungültige Eingaben" });
    }

    const id = "r" + (recipes.length + 1);
    const recipe = {
        id,
        title: String(title).trim(),
        author: req.user.username,
        time: Number(time),
        ingredients,
        steps,
        tags: Array.isArray(tags) ? tags : [],
        ratings: [],
    };
    recipes.push(recipe);
    return res.status(201).json({ message: "Rezept erstellt", data: recipe });
});

// PUT /recipes/:id (geschützt; nur Autor)
router.put("/:id", authenticated, (req, res) => {
    const r = req.recipe;
    if (r.author !== req.user.username)
        return res.status(403).json({ message: "Keine Berechtigung" });

    const up = req.body || {};
    if (up.title) r.title = String(up.title).trim();
    if (Number.isFinite(Number(up.time))) r.time = Number(up.time);
    if (Array.isArray(up.steps)) r.steps = up.steps;
    if (Array.isArray(up.ingredients)) r.ingredients = up.ingredients;
    if (Array.isArray(up.tags)) r.tags = up.tags;

    return res.status(200).json({ message: "Rezept aktualisiert", data: r });
});

// DELETE /recipes/:id (geschützt; nur Autor)
router.delete("/:id", authenticated, (req, res) => {
    const idx = recipes.findIndex((x) => x.id === req.recipe.id);
    if (req.recipe.author !== req.user.username)
        return res.status(403).json({ message: "Keine Berechtigung" });
    recipes.splice(idx, 1);
    return res.status(200).json({ message: "Rezept gelöscht" });
});

// Ratings (geschützt) — create/update/delete
router.post("/:id/ratings", authenticated, (req, res) => {
    let { rating, comment } = req.body;
    rating = Number(rating);
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "rating 1..5 erforderlich" });
    }
    comment = (comment || "").trim();

    const r = req.recipe;
    if (r.ratings.find((x) => x.user === req.user.username)) {
        return res.status(409).json({ message: "Bereits bewertet" });
    }
    r.ratings.push({ user: req.user.username, rating, comment });
    return res.status(201).json({ message: "Bewertung hinzugefügt", data: r });
});

router.put("/:id/ratings", authenticated, (req, res) => {
    let { rating, comment } = req.body;
    rating = Number(rating);
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "rating 1..5 erforderlich" });
    }
    const r = req.recipe;
    const idx = r.ratings.findIndex((x) => x.user === req.user.username);
    if (idx === -1)
        return res
            .status(404)
            .json({ message: "Keine eigene Bewertung vorhanden" });
    r.ratings[idx] = {
        user: req.user.username,
        rating,
        comment: (comment || "").trim(),
    };
    return res.status(200).json({ message: "Bewertung aktualisiert", data: r });
});

router.delete("/:id/ratings", authenticated, (req, res) => {
    const r = req.recipe;
    const idx = r.ratings.findIndex((x) => x.user === req.user.username);
    if (idx === -1)
        return res
            .status(404)
            .json({ message: "Keine eigene Bewertung vorhanden" });
    r.ratings.splice(idx, 1);
    return res.status(200).json({ message: "Bewertung gelöscht", data: r });
});

// Favorites (geschützt)
router.post("/:id/favorite", authenticated, (req, res) => {
    const username = req.user.username;
    const user = users.find((u) => u.username === username);
    const id = req.recipe.id;
    const i = user.favorites.indexOf(id);
    let favorite;
    if (i === -1) {
        user.favorites.push(id);
        favorite = true;
    } else {
        user.favorites.splice(i, 1);
        favorite = false;
    }
    return res.status(200).json({ message: "OK", favorite });
});

module.exports = router;
