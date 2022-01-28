"use strict";

const app = require("./app");
const supertest = require("supertest");
const request = supertest(app);
const db = require("./models/db");

describe("Can access recipes endpoints", () => {
  test("GET /api/recipes", async (done) => {
    const response = await request
      .get("/api/recipes")
      .expect(200)
      .expect("Content-Type", /json/);
    done();
  });
  test("GET /api/recipes/:id", async (done) => {
    const response = await request
      .get("/api/recipes/:id")
      .expect(200)
      .expect("Content-Type", /json/);
    done();
  });
  test("POST /api/recipes (requires auth)", async (done) => {
    const response = await request
      .post("/api/recipes/create")
      .send({
        title: "rice24",
        description: "rice24",
        ingredients: "rice24, something else",
        steps: "1- mix",
        cuisine_id: "1",
        user_id: "1",
      })
      .expect(403);
    done();
  });
});

afterAll(async (done) => {
  // Close db connection
  db.destroy();
  done();
});
