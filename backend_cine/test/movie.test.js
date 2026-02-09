// ============================================
// PRUEBAS INTEGRACIÓN - MOVIE
// ============================================
const request = require('supertest');
const express = require('express');
const cors = require('cors');

// Rutas
const directorRoutes = require('../routes/directorRoutes');
const movieRoutes = require('../routes/movieRoutes');

// Configurar una app de prueba aislada (estilo director.test.js)
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/directors', directorRoutes);
app.use('/api/movies', movieRoutes);

describe('Movie API - Suite de Pruebas Completa', () => {
	let createdDirectorId = null;
	let createdMovieId = null;

	const validDirectorData = {
		name: 'Director Prueba',
		birth_date: '1970-01-01',
		biography: 'Biografía de prueba',
	};

	const validMovieData = (directorId) => ({
		title: 'Película Prueba',
		release_date: '2020-01-01',
		id_director: directorId,
		synopsis: 'Sinopsis de prueba',
	});

	// Crear director para FK
	beforeAll(async () => {
		const res = await request(app).post('/api/directors').send(validDirectorData);
		expect(res.status).toBe(201);
		expect(res.body).toHaveProperty('ok', true);
		createdDirectorId = res.body.datos.id_director;
		expect(typeof createdDirectorId).toBe('number');
	});

	afterAll(async () => {
		// Limpiar película creada
		if (createdMovieId) {
			await request(app).delete(`/api/movies/${createdMovieId}`);
		}
		// Borrar director
		if (createdDirectorId) {
			await request(app).delete(`/api/directors/${createdDirectorId}`);
		}
	});

	// ============================================
	// GET /api/movies
	// ============================================
	describe('GET /api/movies - Obtener todas las películas', () => {
		test('Debería retornar status 200 y estructura válida', async () => {
			const res = await request(app).get('/api/movies').expect(200);
			expect(res.body).toHaveProperty('ok');
			expect(res.body).toHaveProperty('datos');
			expect(res.body).toHaveProperty('mensaje');
			expect(res.body.ok).toBe(true);
			expect(Array.isArray(res.body.datos)).toBe(true);
		});

		test('Los elementos devueltos deben tener campos esperados cuando existan', async () => {
			const res = await request(app).get('/api/movies');
			if (res.body.datos.length > 0) {
				res.body.datos.forEach((m) => {
					expect(m).toHaveProperty('id_movie');
					expect(m).toHaveProperty('title');
					expect(typeof m.id_movie).toBe('number');
					expect(typeof m.title).toBe('string');
				});
			}
		});
	});

	// ============================================
	// POST /api/movies
	// ============================================
	describe('POST /api/movies - Crear película', () => {
		test('Debería crear una película y retornar 201', async () => {
			const newMovie = validMovieData(createdDirectorId);
			const res = await request(app).post('/api/movies').send(newMovie).expect(201);
			expect(res.body.ok).toBe(true);
			expect(res.body).toHaveProperty('datos');
			const datos = res.body.datos;
			expect(datos).toHaveProperty('id_movie');
			expect(typeof datos.id_movie).toBe('number');
			expect(datos.title).toBe(newMovie.title);
			expect(Number(datos.id_director)).toBe(Number(newMovie.id_director));
			createdMovieId = datos.id_movie;
		});

		test('La película creada debe contener todos los campos esperados', async () => {
			const res = await request(app).post('/api/movies').send(validMovieData(createdDirectorId));
			expect(res.body.datos).toHaveProperty('id_movie');
			expect(res.body.datos).toHaveProperty('title');
			expect(res.body.datos).toHaveProperty('release_date');
			expect(res.body.datos).toHaveProperty('synopsis');
			expect(res.body.datos).toHaveProperty('id_director');
		});
	});

	// ============================================
	// GET /api/movies/:id
	// ============================================
	describe('GET /api/movies/:id - Obtener película por ID', () => {
		beforeAll(async () => {
			if (!createdMovieId) {
				const res = await request(app).post('/api/movies').send(validMovieData(createdDirectorId));
				createdMovieId = res.body.datos.id_movie;
			}
		});

		test('Debería retornar 200 y la película con estructura correcta', async () => {
			const res = await request(app).get(`/api/movies/${createdMovieId}`).expect(200);
			expect(res.body.ok).toBe(true);
			expect(res.body.datos).toHaveProperty('id_movie', createdMovieId);
			expect(typeof res.body.datos.title).toBe('string');
		});

		test('Debería retornar 404 para ID no existente', async () => {
			const res = await request(app).get('/api/movies/999999');
			expect(res.status).toBe(404);
			expect(res.body.ok).toBe(false);
			expect(res.body.datos).toBeNull();
		});
	});

	// ============================================
	// PUT /api/movies/:id
	// ============================================
	describe('PUT /api/movies/:id - Actualizar película', () => {
		let movieToUpdate = null;

		beforeAll(async () => {
			const res = await request(app).post('/api/movies').send(validMovieData(createdDirectorId));
			movieToUpdate = res.body.datos;
		});

		test('Debería actualizar la película y retornar 200', async () => {
			const update = { title: 'Título Actualizado' };
			const res = await request(app).put(`/api/movies/${movieToUpdate.id_movie}`).send(update).expect(200);
			expect(res.body.ok).toBe(true);
			expect(res.body.datos).toHaveProperty('id_movie', movieToUpdate.id_movie);
			expect(res.body.datos.title).toBe(update.title);
		});

		test('Debería retornar 404 al actualizar ID no existente', async () => {
			const res = await request(app).put('/api/movies/999999').send({ title: 'X' });
			expect(res.status).toBe(404);
			expect(res.body.ok).toBe(false);
		});
	});

	// ============================================
	// DELETE /api/movies/:id
	// ============================================
	describe('DELETE /api/movies/:id - Eliminar película', () => {
		let movieToDelete = null;

		beforeAll(async () => {
			const res = await request(app).post('/api/movies').send(validMovieData(createdDirectorId));
			movieToDelete = res.body.datos;
		});

		test('Debería eliminar la película y retornar 200', async () => {
			const res = await request(app).delete(`/api/movies/${movieToDelete.id_movie}`).expect(200);
			expect(res.body.ok).toBe(true);
			expect(typeof res.body.mensaje).toBe('string');
		});

		test('La película eliminada ya no debe poder recuperarse', async () => {
			const res = await request(app).get(`/api/movies/${movieToDelete.id_movie}`);
			expect(res.status).toBe(404);
			expect(res.body.ok).toBe(false);
		});
	});
});
