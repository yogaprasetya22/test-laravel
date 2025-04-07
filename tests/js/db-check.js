import { describe, it } from "mocha";
import { expect } from "chai";
import api from "./setup.js";

describe("Database Connection Check", () => {
    describe("GET /db-check", () => {
        it("should confirm database connection is working", async () => {
            const response = await api.get("/db-check");

            expect(response.status).to.equal(200);
            expect(response.data).to.be.a("string");
            expect(response.data).to.include("Koneksi database berhasil");
        });
    });
});
