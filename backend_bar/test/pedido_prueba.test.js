const request = require("supertest");
const app = require("../index");

let cookie = "";

describe("🧾 Pruebas sobre la API de pedidos", () => {
  beforeAll(async () => {
    // Autenticación como admin
    const res = await request(app).post("/api/users/login").send({
       email: "manuel@gmail.com",
      password: "manuel",
    });
    cookie = res.headers["set-cookie"][0];
  });

  test("✅ GET /api/pedidos → Obtener lista de pedidos (admin)", async () => {
    const res = await request(app)
      .get("/api/pedidos")
      .set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.datos)).toBe(true);
  });

  test("✅ GET /api/pedidos/grafica → Obtener datos de gráfica de pedidos (admin)", async () => {
    const res = await request(app)
      .get("/api/pedidos/grafica")
      .set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.datos)).toBe(true);
    // Comprobar que los datos contienen los campos esperados
    if (res.body.datos.length > 0) {
      expect(res.body.datos[0]).toHaveProperty("idplato");
      expect(res.body.datos[0]).toHaveProperty("ventas");
      expect(res.body.datos[0]).toHaveProperty("ingresos");
      expect(res.body.datos[0]).toHaveProperty("'idplato_plato.nombre'");
    }
  });

  test("❌ GET /api/pedidos sin token → Acceso denegado", async () => {
    const res = await request(app).get("/api/pedidos");
    expect(res.statusCode).toBe(401);
  });

  test("❌ GET /api/pedidos/grafica con usuario sin rol admin/user → Acceso denegado", async () => {
    // Login como usuario sin permisos
    const resLogin = await request(app).post("/api/users/login").send({
      email: "otro@email.com",
      password: "1234",
    });
    const cookieUser = resLogin.headers["set-cookie"][0];
    const res = await request(app)
      .get("/api/pedidos/grafica")
      .set("Cookie", cookieUser);
    // Puede ser 403 o 401 según la lógica de roles
    expect([401, 403]).toContain(res.statusCode);
  });
});
