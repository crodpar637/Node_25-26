const request = require("supertest");
const app = require("../index");

describe("🛒 Pruebas sobre la API de pedidos con usuario de role admin", () => {
  let cookie = "";

  beforeAll(async () => {
    // Obtener cookie de autenticación
    const res = await request(app).post("/api/users/login").send({
      email: "manuel@gmail.com",
      password: "manuel",
    });

    cookie = res.headers["set-cookie"][0]; // Obtener la cookie JWT
  });

  test("✅ GET /api/pedidos → Obtener lista de pedidos. Usuario admin autorizado", async () => {
    const res = await request(app).get("/api/pedidos").set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.datos)).toBe(true);
  });

  test("✅ GET /api/pedidos/grafica → Obtener datos de pedidos para la gráfica. Usuario admin autorizado.", async () => {
    const res = await request(app).get("/api/pedidos/grafica").set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
  });
});

describe("🛒 Pruebas sobre la API de pedidos con usuario de role user", () => {
    let cookie = "";
  
    beforeAll(async () => {
      // Obtener cookie de autenticación
      const res = await request(app).post("/api/users/login").send({
        email: "juan@gmail.com",
        password: "juan",
      });
  
      cookie = res.headers["set-cookie"][0]; // Obtener la cookie JWT
    });
  
    test("✅ GET /api/pedidos → Obtener lista de pedidos. Usuario role user no autorizado", async () => {
      const res = await request(app).get("/api/pedidos").set("Cookie", cookie);
      expect(res.statusCode).toBe(403);
      expect(Array.isArray(res.body)).toBe(false);
    });
  
    test("✅ GET /api/pedidos/grafica → Obtener datos de pedidos para la gráfica. Usuario role user autorizado.", async () => {
      const res = await request(app).get("/api/pedidos/grafica").set("Cookie", cookie);
      expect(res.statusCode).toBe(200);
    });
  });
  