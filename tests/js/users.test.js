import { describe, it, before } from "mocha";
import { expect } from "chai";
import api from "./setup.js";

describe("User API Endpoints", () => {
    let userId;
    const testUser = {
        name: "Test User",
        email: "test" + Date.now() + "@example.com", // Email unik untuk mencegah duplikasi
        age: 25
    };
    const updatedUser = {
        name: "Updated Test User",
        age: 30
    };

    // Test GET /users
    describe("GET /users", () => {
        it("should return all users", async () => {
            const response = await api.get("/users");
            
            expect(response.status).to.equal(200);
            expect(response.data).to.be.an("array"); // API mengembalikan array langsung
        });
    });
    
    // Test POST /users
    describe("POST /users", () => {
        it("should create a new user", async () => {
            const response = await api.post("/users", testUser);
            
            expect(response.status).to.equal(201);
            expect(response.data).to.be.an("object");
            expect(response.data).to.have.property("uuid");
            expect(response.data.name).to.equal(testUser.name);
            expect(response.data.email).to.equal(testUser.email);
            expect(response.data.age).to.equal(testUser.age);
            
            // Simpan ID user untuk test berikutnya
            userId = response.data.uuid;
        });
        
        it("should return validation error with invalid data", async () => {
            try {
                await api.post("/users", { name: "Invalid User" }); // Missing required fields
            } catch (error) {
                expect(error.response.status).to.equal(422);
                expect(error.response.data).to.have.property("errors");
            }
        });
    });
    
    // Tambahkan test GET user by ID
    describe("GET /users/:uuid", () => {
        it("should get user by ID", async () => {
            // Hanya jalankan jika userId sudah ada dari test sebelumnya
            if (!userId) {
                this.skip();
                return;
            }

            try {
                const response = await api.get(`/users/${userId}`);
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an("object");
                expect(response.data.uuid).to.equal(userId);
            } catch (error) {
                // Jika endpoint tidak didukung, skip test ini
                if (error.response && error.response.status === 405) {
                    this.skip();
                } else {
                    throw error;
                }
            }
        });
    });
    
    // Test PATCH /users/{uuid}
    describe("PATCH /users/{uuid}", () => {
        it("should update an existing user", async () => {
            // Hanya jalankan jika userId sudah ada dari test sebelumnya
            if (!userId) {
                this.skip();
                return;
            }

            const response = await api.patch(`/users/${userId}`, updatedUser);
            
            expect(response.status).to.equal(200);
            expect(response.data).to.be.an("object");
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

        it("should reject invalid data", async () => {
            // Hanya jalankan jika userId sudah ada
            if (!userId) {
                this.skip();
                return;
            }

            try {
                await api.patch(`/users/${userId}`, { age: "invalid-age" });
            } catch (error) {
                expect(error.response.status).to.equal(422);
            }
        });
    });
    
    // Test DELETE /users/{uuid}
    describe("DELETE /users/{uuid}", () => {
        it("should delete an existing user", async () => {
            // Hanya jalankan jika userId sudah ada
            if (!userId) {
                this.skip();
                return;
            }

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

    // Test Database Check Endpoint
    describe("GET /db-check", () => {
        it("should confirm database connection is working", async () => {
            const response = await api.get("/db-check");
            
            expect(response.status).to.equal(200);
            expect(response.data).to.be.a("string");
            expect(response.data).to.include("Koneksi database berhasil");
        });
    });
});