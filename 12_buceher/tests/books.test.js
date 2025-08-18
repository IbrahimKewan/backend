const request = require("supertest");
const app = require("../app");
const { users, books } = require("../data/seeds");
const { ADDRGETNETWORKPARAMS } = require("dns");

let login = async () => {
    const user = "ibrahim";
    const pass = "test123";
    const login = await request(app).post("/auth/login").send({
        username: user,
        password: pass,
    });
    return login.body.token;
};

describe("GET books", () => {
    beforeEach(() => {
        users.length = 0;
        users.push({ username: "ibrahim", password: "test123" });
    });

    it("should get all books", async () => {
        const token = await login();
        const books = await request(app)
            .get("/books")
            .set("Authorization", `Bearer ${token}`);
        expect(books.statusCode).toBe(200);
        expect(books.body.message).toEqual("OK");
        expect(typeof books.body).toEqual("object");
        expect(books.body.results.length).toBe(10);
    });

    it("should return book?title=", async () => {
        const token = await login();
        const res = await request(app)
            .get("/books?title=Atomic Habits")
            .set("Authorization", `Bearer ${token}`);
        expect(res.body.message).toEqual("OK");
        expect(res.body).toHaveProperty("results");
        expect(res.body.results[0].title).toEqual("Atomic Habits");
    });

    it("should return book/id=", async () => {
        const token = await login();
        const res = await request(app)
            .get("/books/b3")
            .set("Authorization", `Bearer ${token}`);
        expect(res.body.data.id).toEqual("b3");
        expect(res.body.data.tags[1]).toEqual("focus");
    });

    it("should return boo?author=", async () => {
        const token = await login();
        const res = await request(app)
            .get("/books?author=Andrew Hunt, David Thomas")
            .set("Authorization", `Bearer ${token}`);
        expect(res.body.results[0].author).toEqual("Andrew Hunt, David Thomas");
        expect(Array.isArray(res.body.results[0].reviews)).toEqual(true);
    });
});

describe("POST books", () => {
    beforeEach(() => {
        users.length = 0;
        users.push({ username: "ibrahim", password: "test123" });
    });

    it("should post new book", async () => {
        const token = await login();
        const res = await request(app)
            .post("/books/")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "test",
                author: "ibrahim",
                year: 2000,
                tags: ["test2222", "test3333"],
            });
        expect(res.body.data.id).toEqual("b11");
        expect(res.body.data.id.startsWith("b")).toBe(true);
        expect(typeof res.body.data.id).toEqual("string");
        expect(res.body.message).toEqual(
            "Buch wurde erfolgreich hinzugefügt :)"
        );
    });

    it("should update book data bei id", async () => {
        const token = await login();
        const res = await request(app)
            .put("/books/b6")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "test",
            });
        expect(res.body.message).toEqual("OK");
        expect(typeof res.body.data).toBe("object");
    });

    it("should delete book bei id", async () => {
        const token = await login();
        const res = await request(app)
            .delete("/books/b10")
            .set("Authorization", `Bearer ${token}`);
        expect(res.body.message).toEqual(
            "Buch mit ID: b10 wurde erfolgreich gelöscht :)"
        );
    });

    it("should post new review", async () => {
        const token = await login();
        const res = await request(app)
            .post("/books/b6/reviews")
            .set("Authorization", `Bearer ${token}`)
            .send({
                rating: 3,
                comment: "TESTETSETSET",
            });
        expect(res.body.message).toEqual(
            "Sie haben Ihre Bewertung erfolgreich abgegeben"
        );
        expect(res.body.data.id).toEqual("b6");
        console.log(res.body.data);
        const reviewUser = books.reviews.findIndex((r) => r.user === user);
        expect(res.body.data.reviews[reviewUser]).toEqual({
            rating: 3,
            comment: "TESTETSETSET",
        });
    });
});
