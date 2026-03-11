// ============================================
// PRUEBAS UNITARIAS E INTEGRACIÓN - DIRECTOR
// ============================================
const request = require("supertest");
const express = require("express");
const path = require("path");
const cors = require("cors");

// Importar rutas
const directorRoutes = require("../routes/directorRoutes");

// ============================================
// CONFIGURACIÓN DE LA APLICACIÓN DE PRUEBA
// ============================================
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/directors", directorRoutes);

// ============================================
// PRUEBAS
// ============================================

describe("Director API - Suite de Pruebas Completa", () => {
  let createdDirectorId = null;
  const validDirectorData = {
    name: "Stanley Kubrick",
    birth_date: "1928-07-26",
    biography: "Director de cine estadounidense conocido por sus películas innovadoras",
    photo_url: "https://example.com/kubrick.jpg"
  };

  const updateDirectorData = {
    name: "Stanley Kubrick Updated",
    birth_date: "1928-07-26",
    biography: "Director de cine estadounidense - biografía actualizada",
    photo_url: "https://example.com/kubrick-updated.jpg"
  };

  // ============================================
  // DESCRIBE: GET /api/directors - Obtener todos los directores
  // ============================================
  describe("GET /api/directors - Obtener todos los directores", () => {
    test("Debería retornar status 200", async () => {
      const res = await request(app)
        .get("/api/directors")
        .expect(200);
    });

    test("Debería retornar un objeto JSON con estructura válida", async () => {
      const res = await request(app)
        .get("/api/directors")
        .expect("Content-Type", /json/);

      expect(res.body).toHaveProperty("ok");
      expect(res.body).toHaveProperty("datos");
      expect(res.body).toHaveProperty("mensaje");
    });

    test("Debería retornar ok = true en la respuesta", async () => {
      const res = await request(app).get("/api/directors");

      expect(res.body.ok).toBe(true);
    });

    test("Debería retornar un mensaje descriptivo", async () => {
      const res = await request(app).get("/api/directors");

      expect(typeof res.body.mensaje).toBe("string");
      expect(res.body.mensaje).toContain("Directores recuperados");
    });

    test("Debería retornar un array de directores en datos", async () => {
      const res = await request(app).get("/api/directors");

      expect(Array.isArray(res.body.datos)).toBe(true);
    });

    test("Cada director debería tener estructura válida", async () => {
      const res = await request(app).get("/api/directors");

      if (res.body.datos.length > 0) {
        res.body.datos.forEach((director) => {
          expect(director).toHaveProperty("id_director");
          expect(director).toHaveProperty("name");
          expect(typeof director.id_director).toBe("number");
          expect(typeof director.name).toBe("string");
        });
      }
    });

    test("Los campos de director deberían tener tipos de datos correctos", async () => {
      const res = await request(app).get("/api/directors");

      if (res.body.datos.length > 0) {
        const director = res.body.datos[0];
        expect(typeof director.id_director).toBe("number");
        expect(typeof director.name).toBe("string");
        if (director.birth_date) expect(typeof director.birth_date).toBe("string");
        if (director.biography) expect(typeof director.biography).toBe("string");
        if (director.photo_url) expect(typeof director.photo_url).toBe("string");
      }
    });
  });

  // ============================================
  // DESCRIBE: GET /api/directors/graph - Obtener datos para gráfica
  // ============================================
  describe("GET /api/directors/graph - Obtener datos para gráfica", () => {
    test("Debería retornar status 200", async () => {
      const res = await request(app)
        .get("/api/directors/graph")
        .expect(200);
    });

    test("Debería retornar estructura JSON válida", async () => {
      const res = await request(app)
        .get("/api/directors/graph")
        .expect("Content-Type", /json/);

      expect(res.body).toHaveProperty("ok");
      expect(res.body).toHaveProperty("datos");
      expect(res.body).toHaveProperty("mensaje");
    });

    test("Debería retornar ok = true", async () => {
      const res = await request(app).get("/api/directors/graph");

      expect(res.body.ok).toBe(true);
    });

    test("Debería retornar un array en datos", async () => {
      const res = await request(app).get("/api/directors/graph");

      expect(Array.isArray(res.body.datos)).toBe(true);
    });

    test("Cada elemento should have id_director y total properties", async () => {
      const res = await request(app).get("/api/directors/graph");

      if (res.body.datos.length > 0) {
        res.body.datos.forEach((item) => {
          expect(item).toHaveProperty("id_director");
          expect(item).toHaveProperty("total");
          expect(typeof item.total).toBe("number");
        });
      }
    });

    test("El total debería ser un número mayor o igual a 0", async () => {
      const res = await request(app).get("/api/directors/graph");

      if (res.body.datos.length > 0) {
        res.body.datos.forEach((item) => {
          expect(item.total).toBeGreaterThanOrEqual(0);
        });
      }
    });
  });

  // ============================================
  // DESCRIBE: POST /api/directors - Crear director
  // ============================================
  describe("POST /api/directors - Crear un nuevo director", () => {
    test("Debería crear un director y retornar status 201", async () => {
      const res = await request(app)
        .post("/api/directors")
        .send(validDirectorData)
        .expect(201);

      expect(res.body.ok).toBe(true);
      createdDirectorId = res.body.datos.id_director;
    });

    test("El director creado debería tener estructura válida", async () => {
      const res = await request(app)
        .post("/api/directors")
        .send(validDirectorData);

      expect(res.body.datos).toHaveProperty("id_director");
      expect(res.body.datos).toHaveProperty("name");
      expect(res.body.datos).toHaveProperty("birth_date");
      expect(res.body.datos).toHaveProperty("biography");
      expect(res.body.datos).toHaveProperty("photo_url");
    });

    test("Los datos del director creado deberían coincidir con los enviados", async () => {
      const res = await request(app)
        .post("/api/directors")
        .send(validDirectorData);

      expect(res.body.datos.name).toBe(validDirectorData.name);
      expect(res.body.datos.birth_date).toBe(validDirectorData.birth_date);
      expect(res.body.datos.biography).toBe(validDirectorData.biography);
      expect(res.body.datos.photo_url).toBe(validDirectorData.photo_url);
    });

    test("El id_director debería ser un número", async () => {
      const res = await request(app)
        .post("/api/directors")
        .send(validDirectorData);

      expect(typeof res.body.datos.id_director).toBe("number");
      expect(res.body.datos.id_director).toBeGreaterThan(0);
    });

    test("El nombre debería ser un string no vacío", async () => {
      const res = await request(app)
        .post("/api/directors")
        .send(validDirectorData);

      expect(typeof res.body.datos.name).toBe("string");
      expect(res.body.datos.name.length).toBeGreaterThan(0);
    });

    test("Debería retornar mensaje de éxito", async () => {
      const res = await request(app)
        .post("/api/directors")
        .send(validDirectorData);

      expect(res.body.mensaje).toContain("creado correctamente");
    });

    test("Debería aceptar datos con photo_url válida", async () => {
      const directorWithUrl = {
        ...validDirectorData,
        photo_url: "https://goldenglobes.com/wp-content/uploads/2023/11/01-john-ford.jpg"
      };

      const res = await request(app)
        .post("/api/directors")
        .send(directorWithUrl);

      expect(res.status).toBe(201);
      expect(res.body.datos.photo_url).toBe(directorWithUrl.photo_url);
    });

    test("Debería aceptar fecha de nacimiento válida", async () => {
      const directorWithDate = {
        ...validDirectorData,
        birth_date: "1880-12-12"
      };

      const res = await request(app)
        .post("/api/directors")
        .send(directorWithDate);

      expect(res.status).toBe(201);
      expect(res.body.datos.birth_date).toBe("1880-12-12");
    });
  });

  // ============================================
  // DESCRIBE: GET /api/directors/:id - Obtener director por ID
  // ============================================
  describe("GET /api/directors/:id - Obtener director por ID", () => {
    beforeAll(async () => {
      // Crear un director para las pruebas
      const res = await request(app)
        .post("/api/directors")
        .send(validDirectorData);
      createdDirectorId = res.body.datos.id_director;
    });

    test("Debería retornar status 200 para un ID válido", async () => {
      const res = await request(app)
        .get(`/api/directors/${createdDirectorId}`)
        .expect(200);

      expect(res.body.ok).toBe(true);
    });

    test("Debería retornar estructura JSON válida", async () => {
      const res = await request(app)
        .get(`/api/directors/${createdDirectorId}`)
        .expect("Content-Type", /json/);

      expect(res.body).toHaveProperty("ok");
      expect(res.body).toHaveProperty("datos");
      expect(res.body).toHaveProperty("mensaje");
    });

    test("El director retornado debería tener estructura completa", async () => {
      const res = await request(app)
        .get(`/api/directors/${createdDirectorId}`);

      expect(res.body.datos).toHaveProperty("id_director");
      expect(res.body.datos).toHaveProperty("name");
      expect(res.body.datos).toHaveProperty("birth_date");
      expect(res.body.datos).toHaveProperty("biography");
      expect(res.body.datos).toHaveProperty("photo_url");
    });

    test("El id del director retornado debería coincidir con el solicitado", async () => {
      const res = await request(app)
        .get(`/api/directors/${createdDirectorId}`);

      expect(res.body.datos.id_director).toBe(createdDirectorId);
    });

    test("Los tipos de datos deberían ser correctos", async () => {
      const res = await request(app)
        .get(`/api/directors/${createdDirectorId}`);

      const director = res.body.datos;
      expect(typeof director.id_director).toBe("number");
      expect(typeof director.name).toBe("string");
      if (director.birth_date) expect(typeof director.birth_date).toBe("string");
      if (director.biography) expect(typeof director.biography).toBe("string");
      if (director.photo_url) expect(typeof director.photo_url).toBe("string");
    });

    test("Debería retornar 404 para un ID no existente", async () => {
      const res = await request(app)
        .get("/api/directors/999999")
        .expect(404);

      expect(res.body.ok).toBe(false);
      expect(res.body.datos).toBeNull();
      expect(res.body.mensaje).toContain("no encontrado");
    });

    test("La respuesta 404 debería tener estructura válida", async () => {
      const res = await request(app)
        .get("/api/directors/999999");

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("ok");
      expect(res.body).toHaveProperty("datos");
      expect(res.body).toHaveProperty("mensaje");
      expect(res.body.ok).toBe(false);
    });
  });

  // ============================================
  // DESCRIBE: PUT /api/directors/:id - Actualizar director
  // ============================================
  describe("PUT /api/directors/:id - Actualizar un director", () => {
    let directorToUpdate = null;

    beforeAll(async () => {
      // Crear un director para actualizar
      const res = await request(app)
        .post("/api/directors")
        .send(validDirectorData);
      directorToUpdate = {
        id_director: res.body.datos.id_director,
        ...updateDirectorData
      };
    });

    test("Debería actualizar un director y retornar status 204", async () => {
      const res = await request(app)
        .put(`/api/directors/${directorToUpdate.id_director}`)
        .send(directorToUpdate)
        .expect(204);
    });

    test("Los cambios deberían reflejarse al recuperar el director", async () => {
      const res = await request(app)
        .get(`/api/directors/${directorToUpdate.id_director}`);

      expect(res.body.datos.name).toBe(updateDirectorData.name);
      expect(res.body.datos.biography).toBe(updateDirectorData.biography);
    });

    test("Debería permitir actualizar solo algunos campos", async () => {
      const partialUpdate = {
        id_director: directorToUpdate.id_director,
        name: "Nombre Actualizado Parcialmente"
      };

      await request(app)
        .put(`/api/directors/${directorToUpdate.id_director}`)
        .send(partialUpdate)
        .expect(204);

      const res = await request(app)
        .get(`/api/directors/${directorToUpdate.id_director}`);

      expect(res.body.datos.name).toBe(partialUpdate.name);
    });

    test("Debería retornar 404 para un ID no existente", async () => {
      const res = await request(app)
        .put("/api/directors/999999")
        .send(updateDirectorData)
        .expect(404);

      expect(res.body.ok).toBe(false);
      expect(res.body.datos).toBeNull();
    });

    test("Debería mantener los datos válidos después de actualizar", async () => {
      const updatedData = {
        id_director: directorToUpdate.id_director,
        name: "Nombre Final",
        birth_date: "1920-01-01",
        biography: "Biografía final",
        photo_url: "https://example.com/final.jpg"
      };

      await request(app)
        .put(`/api/directors/${directorToUpdate.id_director}`)
        .send(updatedData);

      const res = await request(app)
        .get(`/api/directors/${directorToUpdate.id_director}`);

      expect(res.body.datos.name).toBe(updatedData.name);
      expect(res.body.datos.birth_date).toBe(updatedData.birth_date);
      expect(res.body.datos.biography).toBe(updatedData.biography);
    });
  });

  // ============================================
  // DESCRIBE: DELETE /api/directors/:id - Eliminar director
  // ============================================
  describe("DELETE /api/directors/:id - Eliminar un director", () => {
    let directorToDelete = null;

    beforeEach(async () => {
      // Crear un director para eliminar
      const res = await request(app)
        .post("/api/directors")
        .send(validDirectorData);
      directorToDelete = res.body.datos.id_director;
    });

    test("Debería eliminar un director y retornar status 204", async () => {
      const res = await request(app)
        .delete(`/api/directors/${directorToDelete}`)
        .expect(204);
    });

    test("El director eliminado no debería existir después", async () => {
      await request(app)
        .delete(`/api/directors/${directorToDelete}`);

      const res = await request(app)
        .get(`/api/directors/${directorToDelete}`)
        .expect(404);

      expect(res.body.ok).toBe(false);
    });

    test("Debería retornar 404 al intentar eliminar un ID inexistente", async () => {
      const res = await request(app)
        .delete("/api/directors/999999")
        .expect(404);

      expect(res.body.ok).toBe(false);
      expect(res.body.datos).toBeNull();
      expect(res.body.mensaje).toContain("no encontrado");
    });

    test("La respuesta 404 debería tener estructura válida", async () => {
      const res = await request(app)
        .delete("/api/directors/50");

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("ok");
      expect(res.body).toHaveProperty("datos");
      expect(res.body).toHaveProperty("mensaje");
    });

    test("No debería permitir acceso al director después de eliminarlo", async () => {
      // Crear director
      const createRes = await request(app)
        .post("/api/directors")
        .send(validDirectorData);
      const directorId = createRes.body.datos.id_director;

      // Verificar que existe
      await request(app)
        .get(`/api/directors/${directorId}`)
        .expect(200);

      // Eliminar
      await request(app)
        .delete(`/api/directors/${directorId}`)
        .expect(204);

      // Verificar que no existe
      const finalRes = await request(app)
        .get(`/api/directors/${directorId}`);

      expect(finalRes.status).toBe(404);
      expect(finalRes.body.ok).toBe(false);
    });
  });

  // ============================================
  // DESCRIBE: PRUEBAS DE FLUJO COMPLETO
  // ============================================
  describe("Flujo Completo CRUD - Director", () => {
    test("Debería realizar un flujo completo CREATE-READ-UPDATE-DELETE", async () => {
      // CREATE: Crear un director
      const createRes = await request(app)
        .post("/api/directors")
        .send(validDirectorData)
        .expect(201);

      expect(createRes.body.ok).toBe(true);
      const directorId = createRes.body.datos.id_director;

      // READ: Verificar que el director existe
      const readRes = await request(app)
        .get(`/api/directors/${directorId}`)
        .expect(200);

      expect(readRes.body.datos.id_director).toBe(directorId);
      expect(readRes.body.datos.name).toBe(validDirectorData.name);

      // UPDATE: Actualizar el director
      const updatedData = {
        id_director: directorId,
        name: "Nombre Actualizado en Flujo",
        birth_date: "1950-05-05"
      };

      await request(app)
        .put(`/api/directors/${directorId}`)
        .send(updatedData)
        .expect(204);

      // Verificar actualización
      const updatedReadRes = await request(app)
        .get(`/api/directors/${directorId}`)
        .expect(200);

      expect(updatedReadRes.body.datos.name).toBe(updatedData.name);

      // DELETE: Eliminar el director
      await request(app)
        .delete(`/api/directors/${directorId}`)
        .expect(204);

      // Verificar eliminación
      await request(app)
        .get(`/api/directors/${directorId}`)
        .expect(404);
    });

    test("Debería listar correctamente después de operaciones CRUD", async () => {
      const beforeRes = await request(app)
        .get("/api/directors");
      const countBefore = beforeRes.body.datos.length;

      // Crear
      const createRes = await request(app)
        .post("/api/directors")
        .send(validDirectorData);

      const afterCreateRes = await request(app)
        .get("/api/directors");
      expect(afterCreateRes.body.datos.length).toBe(countBefore + 1);

      // Eliminar
      await request(app)
        .delete(`/api/directors/${createRes.body.datos.id_director}`);

      const afterDeleteRes = await request(app)
        .get("/api/directors");
      expect(afterDeleteRes.body.datos.length).toBe(countBefore);
    });
  });

  // ============================================
  // DESCRIBE: VALIDACIONES DE DATOS
  // ============================================
  describe("Validaciones de Estructura y Tipos de Datos", () => {
    test("Cada director debería tener id_director como número positivo", async () => {
      const res = await request(app).get("/api/directors");

      res.body.datos.forEach((director) => {
        expect(typeof director.id_director).toBe("number");
        expect(director.id_director).toBeGreaterThan(0);
      });
    });

    test("El campo name debería ser string no vacío", async () => {
      const res = await request(app).get("/api/directors");

      res.body.datos.forEach((director) => {
        expect(typeof director.name).toBe("string");
        expect(director.name.length).toBeGreaterThan(0);
      });
    });

    test("birth_date debería ser string válido o null", async () => {
      const res = await request(app).get("/api/directors");

      res.body.datos.forEach((director) => {
        if (director.birth_date !== null) {
          expect(typeof director.birth_date).toBe("string");
        }
      });
    });

    test("Los campos opcionales deberían permitir valores null", async () => {
      const minimalDirector = {
        name: "Director Mínimo"
      };

      const res = await request(app)
        .post("/api/directors")
        .send(minimalDirector);

      expect(res.status).toBe(201);
      expect(res.body.datos).toHaveProperty("id_director");
      expect(res.body.datos).toHaveProperty("name");
    });

    test("photo_url debería ser string válido o null", async () => {
      const res = await request(app).get("/api/directors");

      res.body.datos.forEach((director) => {
        if (director.photo_url !== null) {
          expect(typeof director.photo_url).toBe("string");
        }
      });
    });
  });

  // ============================================
  // DESCRIBE: VALIDACIONES DE RESPUESTA
  // ============================================
  describe("Validaciones de Respuestas HTTP", () => {
    test("Las respuestas deberían tener Content-Type application/json", async () => {
      const endpoints = [
        { method: "get", path: "/api/directors" },
        { method: "get", path: "/api/directors/graph" }
      ];

      for (const endpoint of endpoints) {
        const res = await request(app)[endpoint.method](endpoint.path);
        expect(res.headers["content-type"]).toMatch(/json/);
      }
    });

    test("Todas las respuestas deberían contener los campos ok, datos y mensaje", async () => {
      const res = await request(app).get("/api/directors");

      expect(res.body).toHaveProperty("ok");
      expect(res.body).toHaveProperty("datos");
      expect(res.body).toHaveProperty("mensaje");
    });

    test("El campo ok debería ser booleano", async () => {
      const res = await request(app).get("/api/directors");

      expect(typeof res.body.ok).toBe("boolean");
    });

    test("El campo mensaje debería ser string", async () => {
      const res = await request(app).get("/api/directors");

      expect(typeof res.body.mensaje).toBe("string");
    });

    test("El campo datos debería existir y no ser undefined", async () => {
      const res = await request(app).get("/api/directors");

      expect(res.body.datos).toBeDefined();
    });
  });
});
