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
