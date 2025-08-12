const recipes = [
    {
        id: "r1",
        title: "Spaghetti Aglio e Olio",
        author: "alice",
        time: 15,
        ingredients: [
            { name: "Spaghetti", amount: "200 g" },
            { name: "Knoblauch", amount: "3 Zehen" },
            { name: "Olivenöl", amount: "4 EL" },
            { name: "Chiliflocken", amount: "1 TL" },
        ],
        steps: [
            "Spaghetti in Salzwasser kochen.",
            "Knoblauch in Öl anrösten, Chili dazu.",
            "Nudeln untermischen und servieren.",
        ],
        tags: ["pasta", "quick", "italian"],
        ratings: [{ user: "bob", rating: 5, comment: "Einfach super!" }],
    },
    {
        id: "r2",
        title: "Avocado Toast",
        author: "alice",
        time: 10,
        ingredients: [
            { name: "Brot", amount: "2 Scheiben" },
            { name: "Avocado", amount: "1" },
        ],
        steps: ["Brot toasten.", "Avocado zerdrücken und würzen."],
        tags: ["vegan", "breakfast", "quick"],
        ratings: [],
    },
];

function avgRating(r) {
    if (!r.rating.length) return 0;
    const sum = r.ratings.reduce((spei, akt) => spei + akt);
    return Math.round((sum / r.rating.length) * 10) / 10;
}

module.exports = { recipes, avgRating };
