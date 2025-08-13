const request = require("supertest");
const app = require("../app");

describe("SMOKE", () => {
    it("GET /ping -> 200", async () => {
        const res = await request(app).get("/ping");
        expect(res.status).toBe(200);
        expect(res.body.message).toBeDefined();
    });
});
