const request = require("supertest");
const app = require("../app");
const { users, books } = require("../data/seeds");
const { log } = require("console");

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
        // console.log(res.body.results);
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
        // console.log(res.body);
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
    });
});
