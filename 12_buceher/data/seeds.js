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
    {
        id: "b4",
        title: "You Don't Know JS",
        author: "Kyle Simpson",
        year: 2015,
        tags: ["javascript", "programming"],
        reviews: [{ user: "alice", rating: 4, comment: "Sehr detailliert." }],
    },
    {
        id: "b5",
        title: "Atomic Habits",
        author: "James Clear",
        year: 2018,
        tags: ["habits", "self-improvement"],
        reviews: [{ user: "bob", rating: 5, comment: "Super Tipps!" }],
    },
    {
        id: "b6",
        title: "Refactoring",
        author: "Martin Fowler",
        year: 2018,
        tags: ["programming", "refactoring"],
        reviews: [],
    },
    {
        id: "b7",
        title: "The Art of Computer Programming",
        author: "Donald Knuth",
        year: 1968,
        tags: ["programming", "algorithms"],
        reviews: [{ user: "alice", rating: 5, comment: "Klassiker!" }],
    },
    {
        id: "b8",
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        year: 2011,
        tags: ["psychology", "thinking"],
        reviews: [],
    },
    {
        id: "b9",
        title: "Eloquent JavaScript",
        author: "Marijn Haverbeke",
        year: 2018,
        tags: ["javascript", "programming"],
        reviews: [{ user: "bob", rating: 4, comment: "Gut für Einsteiger." }],
    },
    {
        id: "b10",
        title: "Design Patterns",
        author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
        year: 1994,
        tags: ["programming", "design-patterns"],
        reviews: [],
    },
];

const users = [
    { username: "alice", password: "alice123" },
    { username: "bob", password: "bob123" },
];

module.exports = { users, books };
