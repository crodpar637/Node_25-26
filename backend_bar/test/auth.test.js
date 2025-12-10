const request = require("supertest");
const app = require("../index");  // El objeto app es nuestra aplicación Express

describe("🔐 Pruebas de autenticación con cookies HttpOnly", () => {
  test("✅ Registro de usuario (Signup) con email ya existente", async () => {
    const res = await request(app).post("/api/users/signup").send({
      username: "Ángel",
      email: "angel@gmail.com",
      password: "angel",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.mensaje).toBe("Ya existe un usuario con ese correo electrónico.");
  });

  test("✅ Registro de usuario (Signup) con email no existente", async () => {
    const res = await request(app).post("/api/users/signup").send({
      username: "Ángel",
      email: "angel"+ Math.floor(Math.random() * 10000000) + "@gmail.com",
      password: "angel",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.mensaje).toBe("Usuario registrado exitosamente");
  });

  test("✅ Login de usuario correcto", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "juan@gmail.com",
      password: "juan",
    });

    expect(res.statusCode).toBe(200);
    expect(res.headers["set-cookie"]).toBeDefined(); // Verificamos que la cookie esté presente
  });

  test("❌ Login con usuario incorrecto", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "juanillo@gmail.com",
      password: "juan",
    });

    expect(res.statusCode).toBe(401);
  });

  test("❌ Login con contraseña incorrecta", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "juan@gmail.com",
      password: "juanillo",
    });

    expect(res.statusCode).toBe(401);
  });

  test("✅ Logout de usuario", async () => {
    const res = await request(app)
      .post("/api/users/logout")
      .set("Cookie", "jwt_token=somevalidtoken");
    expect(res.statusCode).toBe(200);
  });
});
