import test from "node:test";
import assert from "node:assert";
import request from "supertest";
import { app } from "../src/app.js";
import { uptime } from "node:process";

// Test 1: Check root endpoint

test("GET / should return welcome message", async () => {

    const response = await request(app).get("/");

    assert.strictEqual(response.status, 200);

    assert.deepStrictEqual(response.body, {
        message: 'Hello, World! from the get route'
    });
});

// Test 2: Check health endpoint

test("GET /health should return complete health response", async () => {

    // Arrange & Act
    const response = await request(app).get("/health");

    // Assert: HTTP status
    assert.equal(response.status, 200);

    // Assert: Content type
    assert.match(response.headers["content-type"], /application\/json/);

    // Assert: Complete object structure
    assert.deepStrictEqual(
        Object.keys(response.body).sort(),
        ["message", "status", "timestamp", "uptime"].sort()
    );

    // Assert: Static values
    assert.equal(response.body.message, "Server is healthy");
    assert.equal(response.body.status, "OK");

    // Assert: Timestamp
    assert.equal(typeof response.body.timestamp, "string");

    const parsedTimestamp = Date.parse(response.body.timestamp);

    assert.ok(!Number.isNaN(parsedTimestamp));

    // Assert: Uptime
    assert.match(
        response.body.uptime,
        /^\d+ minutes and \d+ seconds$/
    );
});