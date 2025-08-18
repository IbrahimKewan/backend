const request = require("supertest");
const app = require("../app");
const { users } = require("../data/seeds");

describe("POST /auth/register", () => {
    beforeEach(() => {
        users.length = 0;
    });
    const user = "ibrahim";
    const pass = "test123";

    it("Should register a user", async () => {
        const res = await request(app).post("/auth/register").send({
            username: user,
            password: pass,
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual({
            message: "Registrierung war Erfolggreich :)",
            username: user,
        });
    });

    it("Should return Benutzer existiert schon bereits", async () => {
        await request(app).post("/auth/register").send({
            username: user,
            password: pass,
        });
        const res_2 = await request(app).post("/auth/register").send({
            username: user,
            password: pass,
        });
        expect(res_2.statusCode).toEqual(403);
        expect(res_2.body).toEqual({
            message: "Benutzer existiert schon bereits",
            username: user,
        });
    });

    it("Should return Benutzername (min. 4) erforderlich", async () => {
        const res = await request(app).post("/auth/register").send({
            username: "use",
            password: pass,
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("message");
        expect(res.body).toEqual({
            message: "Benutzername (min. 4) erforderlich",
        });
    });

    it("Sould return Passwort min.6 erforderlich!", async () => {
        const res = await request(app).post("/auth/register").send({
            username: user,
            password: "eee",
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({
            message: "Passwort min.6 erforderlich!",
        });
    });

    it("Sould return ...", async () => {
        const res = await request(app).post("/auth/register").send({
            username: "",
            password: "",
        });
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
            message: "Benutzername und Password sind erfoderlich!!!",
        });
    });
});
