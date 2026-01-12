// controllers/directorController.js
const { logMensaje } = require("../utils/logger.js");
const directorService = require("../services/directorService");

class DirectorController {
  async getAllDirectors(req, res) {
    try {
      const directors = await directorService.getAllDirectors();
      return res.status(200).json({
        ok: true,
        datos: directors,
        mensaje: "Directores recuperados correctamente",
      });
    } catch (err) {
      logMensaje("Error en getAllDirector:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar directores",
      });
    }
  }
  async createDirector(req, res) {
    const director = req.body;

    try {
      const directorNew = await directorService.createDirector(director);

      return res.status(201).json({
        ok: true,
        datos: directorNew,
        mensaje: "Director creado correctamente",
      });
    } catch (err) {
      logMensaje("Error en createDirector:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al crear un director",
      });
    }
  }
  async deleteDirector(req, res) {
    const id_director = req.params.id;

    try {
      const numFilas = await directorService.deleteDirector(id_director);

      if (numFilas == 0) {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "Director no encontrado: " + id_director,
        });
      } else {
        // Borrado correcto
        return res.status(204).send();
      }
    } catch (err) {
      logMensaje("Error en deleteDirector:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al borrar un director",
      });
    }
  }

  async updateDirector(req, res) {
    // Recupero el id_director de la ruta
    const id_director = req.params.id;
    // El objeto del director llega en el body
    const director = req.body;

    try {
      const numFilas = await directorService.updateDirector(director);

      if (numFilas == 0) {
        // No se ha encontrado lo que se quería actualizar o no hay nada que cambiar
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "No encontrado: " + director.id_director,
        });
      } else {
        // Al dar status 204 no se devuelva nada
        res.status(204).send();
      }
    } catch (err) {
      logMensaje("Error en EditDirector:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al editar un director",
      });
    }
  }

  async getDirectorById(req, res) {
    const id_director = req.params.id;
    try {
      const director = await directorService.getDirectorById(id_director);
      // director != null -- se ha encontrado el directos
      if (director) {
        return res.status(200).json({
          ok: true,
          datos: director,
          mensaje: "Director recuperado correctamente",
        });
      } else {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "Director no encontrado",
        });
      }
    } catch (err) {
      logMensaje("Error en getDirectorById:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar un director",
      });
    }
  }
}

module.exports = new DirectorController();
