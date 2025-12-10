const request = require("supertest");
const app = require("../index");

let platoInsertado = null; // ID del plato insertado

describe("🍽️ Pruebas sobre la API de platos", () => {
  let cookie = "";

  beforeAll(async () => {
    // Obtener cookie de autenticación
    const res = await request(app).post("/api/users/login").send({
      email: "juan@gmail.com",
      password: "juan",
    });

    cookie = res.headers["set-cookie"][0]; // Obtener la cookie JWT
  });

  test("✅ Crear un plato exitosamente", async () => {
    // Datos de ejemplo para un plato
    const platoData = {
      nombre: "Tostada",
      precio: 1.5,
      descripcion: "Pan tostado con aceite de oliva",
    };

    // Realizamos la petición POST
    const res = await request(app).post("/api/platos").send(platoData);

    // Verificamos que la respuesta sea correcta
    expect(res.statusCode).toBe(201); // El plato se ha creado con éxito
    expect(res.body.mensaje).toBe("Plato insertado");
    platoInsertado = res.body.datos.idplato; // Guardamos el ID del plato insertado para futuras pruebas
  });

  test("✅ GET /api/platos → Obtener lista de platos", async () => {
    const res = await request(app).get("/api/platos").set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.datos)).toBe(true);
  });

  test("✅ GET /api/platos/:id → Obtener un plato por ID", async () => {
    const res = await request(app).get("/api/platos/36").set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
  });

  test("❌ DELETE /api/platos/99 → Borrar un plato que no existe (404)", async () => {
    const res = await request(app)
      .delete("/api/platos/99")
      .set("Cookie", cookie);
    expect(res.statusCode).toBe(404);
  });

  test("✅ DELETE /api/platos/:id → Borrar un plato existente (204)", async () => {
    const res = await request(app)
      .delete(`/api/platos/${platoInsertado}`)
      .set("Cookie", cookie);
    expect(res.statusCode).toBe(204);
  });

  test("❌ PUT /api/platos/82 → Actualizar un plato con datos incorrectos (400)", async () => {
    const res = await request(app)
      .put("/api/platos/82")
      .send({
        idplato: 45, // ID incorrecto
        nombre: "PAPAS ALIÑÁS",
        precio: 4,
        descripcion: "Descripción actualizada",
      })
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(400);
  });
});
