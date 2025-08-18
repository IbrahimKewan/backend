const request = require("supertest");
const app = require("../app");

describe("GET /pind from App.js", () => {
    it("Should return pingo", async () => {
        const res = await request(app).get("/ping");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            message: "pong",
        });
    });
});
