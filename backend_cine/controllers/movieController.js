// controllers/movieController.js
const { logMensaje } = require("../utils/logger.js");
const movieService = require("../services/movieService");

class MovieController {
  async getAllMovies(req, res) {
    try {
      const movies = await movieService.getAllMovies();
      return res.status(200).json({
        ok: true,
        datos: movies,
        mensaje: "Películas recuperadas correctamente",
      });
    } catch (err) {
      logMensaje("Error en getAllMovies:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar películas",
      });
    }
  }

  async getMovieById(req, res) {
    const { id } = req.params;
    try {
      const movie = await movieService.getMovieById(id);
      if (!movie) {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "Película no encontrada",
        });
      }
      return res.status(200).json({
        ok: true,
        datos: movie,
        mensaje: "Película recuperada correctamente",
      });
    } catch (err) {
      logMensaje("Error en getMovieById:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar la película",
      });
    }
  }

  async createMovie(req, res) {
    const movieData = req.body;
    try {
      const newMovie = await movieService.createMovie(movieData);
      return res.status(201).json({
        ok: true,
        datos: newMovie,
        mensaje: "Película creada correctamente",
      });
    } catch (err) {
      logMensaje("Error en createMovie:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al crear la película",
      });
    }
  }

  async updateMovie(req, res) {
    const { id } = req.params;
    const movieData = req.body;
    try {
      const updatedMovie = await movieService.updateMovie(id, movieData);
      if (!updatedMovie) {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "Película no encontrada",
        });
      }
      return res.status(200).json({
        ok: true,
        datos: updatedMovie,
        mensaje: "Película actualizada correctamente",
      });
    } catch (err) {
      logMensaje("Error en updateMovie:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al actualizar la película",
      });
    }
  }

  async deleteMovie(req, res) {
    const { id } = req.params;
    try {
      const deleted = await movieService.deleteMovie(id);
      if (!deleted) {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "Película no encontrada",
        });
      }
      return res.status(200).json({
        ok: true,
        datos: null,
        mensaje: "Película eliminada correctamente",
      });
    } catch (err) {
      logMensaje("Error en deleteMovie:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al eliminar la película",
      });
    }
  }
}

module.exports = new MovieController();