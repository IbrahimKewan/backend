// Original-Seeds (unverändert lassen)
const initialUsers = [
    { username: "alice", password: "alice123", favorites: [] },
    { username: "bob", password: "bob123", favorites: [] },
];

const initialRecipes = [
    {
        id: "r1",
        title: "Spaghetti",
        author: "alice",
        time: 15,
        ingredients: [{ name: "Pasta", amount: "200g" }],
        steps: ["kochen"],
        tags: ["pasta", "quick"],
        ratings: [],
    },
    {
        id: "r2",
        title: "Toast",
        author: "bob",
        time: 5,
        ingredients: [{ name: "Brot", amount: "2" }],
        steps: ["toast"],
        tags: ["breakfast"],
        ratings: [],
    },
];

// Mutierbare Arrays, die von der App genutzt werden:
const users = JSON.parse(JSON.stringify(initialUsers));
const recipes = JSON.parse(JSON.stringify(initialRecipes));

function resetData() {
    users.splice(0, users.length, ...JSON.parse(JSON.stringify(initialUsers)));
    recipes.splice(
        0,
        recipes.length,
        ...JSON.parse(JSON.stringify(initialRecipes))
    );
}

module.exports = { users, recipes, resetData };
