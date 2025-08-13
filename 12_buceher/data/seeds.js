const users = [
    { username: "alice", password: "alice123" },
    { username: "bob", password: "bob123" },
];

const books = [
    {
        id: "b1",
        title: "Clean Code",
        author: "Robert C. Martin",
        year: 2008,
        tags: ["programming", "best-practices"],
        reviews: [{ user: "alice", rating: 5, comment: "Pflichtlektüre." }],
    },
    {
        id: "b2",
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt, David Thomas",
        year: 1999,
        tags: ["programming", "craftsmanship"],
        reviews: [{ user: "bob", rating: 4, comment: "Zeitlos gut." }],
    },
    {
        id: "b3",
        title: "Deep Work",
        author: "Cal Newport",
        year: 2016,
        tags: ["productivity", "focus"],
        reviews: [],
    },
];

module.exports = { users, books };
