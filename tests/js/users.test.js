import { describe, it, before } from "mocha";
import { expect } from "chai";
import api from "./setup.js";

describe("User API Endpoints", () => {
    let userId;
    const testUser = {
        name: "Test User",
        email: "test" + Date.now() + "@example.com",
        age: 25,
    };
    const updatedUser = {
        name: "Updated Test User",
        age: 30,
    };

    // Buat 20 user sebelum semua test dijalankan
    before(async () => {
        for (let i = 1; i <= 20; i++) {
            await api.post("/users", {
                name: `User ${i}`,
                email: `user${i}_${Date.now()}@example.com`,
                age: 20 + i,
            });
        }
    });

    describe("GET /users", () => {
        it("should return all users", async () => {
            const response = await api.get("/users");

            expect(response.status).to.equal(200);
            expect(response.data).to.be.an("array");
            expect(response.data.length).to.be.at.least(20);
        });
    });

    describe("POST /users", () => {
        it("should create a new user", async () => {
            const response = await api.post("/users", testUser);

            expect(response.status).to.equal(201);
            expect(response.data).to.be.an("object");
            expect(response.data).to.have.property("uuid");
            expect(response.data.name).to.equal(testUser.name);
            expect(response.data.email).to.equal(testUser.email);
            expect(response.data.age).to.equal(testUser.age);

            userId = response.data.uuid;
        });

        it("should return validation error with invalid data", async () => {
            try {
                await api.post("/users", { name: "Invalid User" });
            } catch (error) {
                expect(error.response.status).to.equal(422);
                expect(error.response.data).to.have.property("errors");
            }
        });
    });

    describe("GET /users/:uuid", () => {
        it("should get user by ID", async function () {
            if (!userId) return this.skip();

            const response = await api.get(`/users/${userId}`);
            expect(response.status).to.equal(200);
            expect(response.data).to.be.an("object");
            expect(response.data.uuid).to.equal(userId);
        });
    });

    describe("PATCH /users/:uuid", () => {
        it("should update an existing user", async function () {
            if (!userId) return this.skip();

            const response = await api.patch(`/users/${userId}`, updatedUser);

            expect(response.status).to.equal(200);
            expect(response.data.name).to.equal(updatedUser.name);
            expect(response.data.age).to.equal(updatedUser.age);
        });

        it("should return 404 for non-existent user", async () => {
            try {
                await api.patch("/users/non-existent-uuid", updatedUser);
            } catch (error) {
                expect(error.response.status).to.equal(404);
            }
        });

        it("should reject invalid data", async function () {
            if (!userId) return this.skip();

            try {
                await api.patch(`/users/${userId}`, { age: "invalid-age" });
            } catch (error) {
                expect(error.response.status).to.equal(422);
            }
        });
    });

    describe("PATCH /users/:uuid (ganjil)", () => {
        it("should update users at odd indices", async () => {
            const response = await api.get("/users");
            const users = response.data;

            expect(users).to.be.an("array");

            const usersToUpdate = users.filter((_, i) => i % 2 === 0); // index 0,2,4,...
            const updatePayload = {
                name: "Ganjil Update",
                age: 99,
            };

            for (const user of usersToUpdate) {
                const updateResponse = await api.patch(
                    `/users/${user.uuid}`,
                    updatePayload
                );

                expect(updateResponse.status).to.equal(200);
                expect(updateResponse.data.name).to.equal("Ganjil Update");
                expect(updateResponse.data.age).to.equal(99);
            }
        });
    });

    describe("DELETE /users/:uuid", () => {
        it("should delete an existing user", async function () {
            if (!userId) return this.skip();

            const response = await api.delete(`/users/${userId}`);
            expect(response.status).to.equal(204);
        });

        it("should return 404 for non-existent user", async () => {
            try {
                await api.delete("/users/non-existent-uuid");
            } catch (error) {
                expect(error.response.status).to.equal(404);
            }
        });
    });

    describe("GET /db-check", () => {
        it("should confirm database connection is working", async () => {
            const response = await api.get("/db-check");

            expect(response.status).to.equal(200);
            expect(response.data).to.be.a("string");
            expect(response.data).to.include("Koneksi database berhasil");
        });
    });
});
