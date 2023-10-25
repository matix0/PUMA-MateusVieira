const request = require("supertest");
const app = require("../app");

const user = {
  id: 61623585,
  name: "Matix",
  username: "matix0",
  avatar_url: "https://avatars.githubusercontent.com/u/61623585?v=4",
  html_url: "https://github.com/matix0",
  favorite: false,
};

describe("Teste de create", () => {
  it("deve conseguir cadastrar um usuario", async () => {
    const res = await request(app).post("/users").send(user);
    expect(res.statusCode).toEqual(201);
  });

  it("nao deve conseguir cadastrar um usuario já cadastrado", async () => {
    const res = await request(app).post("/users").send(user);
    expect(res.statusCode).toEqual(400);
  });

});

describe("Teste de read", () => {
  it("deve conseguir requisitar os usuarios", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(200);
  });

});

