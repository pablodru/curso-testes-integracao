import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should return 200 when ask /health", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  })

  it("/fibonnacci", async () => {
    const result = await api.get("/fibonacci?elements=20");
    console.log(result)
    expect(result.statusCode).toBe(200);
    expect(result.body[0]+result.body[1]).toEqual(result.body[2])
    expect(result.body[1]+result.body[2]).toEqual(result.body[3])
    expect(result.body[2]+result.body[3]).toEqual(result.body[4])
  })
})