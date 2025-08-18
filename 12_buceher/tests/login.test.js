const request = require("supertest");
const app = require("../app");
const { users } = require("../data/seeds");
const { log } = require("console");

describe("POST login", () => {
    const user = "ibrahim";
    const pass = "test123";
    beforeEach(() => {
        users.length = 0;
        users.push({ username: "ibrahim", password: "test123" });
    });

    it("Should return Anmeldung war Erfolgreich...", async () => {
        const res = await request(app).post("/auth/login").send({
            username: user,
            password: pass,
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        const token = res.body.token;
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Anmeldung war Erfolgreich...");
        expect(res.body.username).toEqual(user);
    });

    it("should return pino", async () => {
        const loginRes = await request(app).post("/auth/login").send({
            username: user,
            password: pass,
        });
        const token = loginRes.body.token;

        const routeRes = await request(app)
            .get("/books/pingo")
            .set("Authorization", `Bearer ${token}`);

        expect(routeRes.statusCode).toBe(200);
        expect(routeRes.body.message).toEqual("OK eingelogt");
    });

    it("should return Benutzername nicht gefunden", async () => {
        const loging = await request(app).post("/auth/login").send({
            username: "test",
            password: pass,
        });
        expect(loging.statusCode).toBe(404);
        expect(loging.body.message).toEqual("Ungültige eingabe!!!");
    });
});
