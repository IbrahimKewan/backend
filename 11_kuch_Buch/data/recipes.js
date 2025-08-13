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
    {
        id: "r3",
        title: "test",
        author: "alice",
        time: 100,
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
    if (!r.ratings.length) return 0;
    const sum = r.ratings.reduce((acc, x) => acc + Number(x.rating || 0), 0);
    return Math.round((sum / r.ratings.length) * 10) / 10; // 1 Nachkommastelle
}

module.exports = { recipes, avgRating };
