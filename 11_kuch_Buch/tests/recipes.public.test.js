// tests/recipes.test.js
const request = require("supertest");
const app = require("../app");
const { resetData } = require("../data/testData");

beforeEach(() => resetData());

describe("Öffentliche Rezepte Abrufen", () => {
    test("GET /recipes -> 200 + array payload", async () => {
        const res = await request(app)
            .get("/recipes")
            .expect(200)
            .expect("Content-Type", /json/);

        expect(Array.isArray(res.body.results)).toBe(true);

        if (res.body.total !== undefined) {
            expect(typeof res.body.total).toBe("number");
            expect(res.body.total).toBeGreaterThanOrEqual(0);
        }
    });

    test("GET /recipes/:id -> 200 + recipe object", async () => {
        const res = await request(app)
            .get("/recipes/r1")
            .expect(200)
            .expect("Content-Type", /json/);

        expect(res.body).toHaveProperty("recipe");
        expect(typeof res.body.recipe).toBe("object");
        expect(res.body.recipe).not.toBeNull();

        // If you know the shape, assert it explicitly. Examples:
        // expect(res.body.recipe).toHaveProperty("id", "r1");
        // expect(res.body.recipe).toHaveProperty("title");
        // expect(Array.isArray(res.body.recipe.ingredients)).toBe(true);
    });

    test("GET /recipes/:id (unknown) -> 404", async () => {
        await request(app).get("/recipes/does-not-exist").expect(404);
    });
});
