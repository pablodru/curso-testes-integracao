import supertest from "supertest";

import app from "./../src/app";
import prisma from "../src/database";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  it("should create a user", async () => {
    const result = await api.post('/users').send({email: "pablo@gmail.com", password:"123456"})
    expect(result.status).toBe(201)
  });

  it("should receive 409 when trying to create two users with same e-mail", async () => {
    await prisma.user.create({
      data: {
        email:"exemplo@gmail.com",
        password: "123456"
      }
    })

    const { status } = await api.post('/users').send({email: "exemplo@gmail.com", password:"123456"})
    expect(status).toBe(409)
  });

});

describe("GET /users tests", () => {
  it("should return a single user", async () => {
    const result = await prisma.user.create({
      data: {
        email:"exemplo@gmail.com",
        password: "123456"
      }
    })

    const { body } = await api.get(`/users/${result.id}`)
    expect(body).toEqual({
      email:"exemplo@gmail.com",
      password: "123456"
    }
    )
  });

  it("should return 404 when can't find a user by id", async () => {
    const result = await prisma.user.create({
      data: {
        email:"exemplo@gmail.com",
        password: "123456"
      }
    })
    const { status } = await api.get(`/users/${result.id+1}`)
    expect(status).toBe(404)
  });

  it("should return all users", async () => {
    const result = await prisma.user.create({
      data: {
        email:"exemplo@gmail.com",
        password: "123456"
      }
    })
    const result2 = await prisma.user.create({
      data: {
        email:"exemplo2@gmail.com",
        password: "123456"
      }
    })
    const result3 = await prisma.user.create({
      data: {
        email:"exemplo3@gmail.com",
        password: "123456"
      }
    })
    const { status, body } = await api.get('/users');
    expect(status).toBe(200);
    expect(body).toHaveLength(3)
    )
  });

})