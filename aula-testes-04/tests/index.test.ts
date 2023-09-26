import app from "app"
import supertest from "supertest"

describe("Testing /health", () =>{

    it("GET /health", async()=> {
        const result = await supertest(app).get('/health');

        const { statusCode } = result;

        expect(statusCode).toBe(200);
    })
})