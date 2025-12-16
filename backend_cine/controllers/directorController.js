// controllers/directorController.js
const directorService = require('../services/directorService');

class DirectorController {
  async getAllDirector(req, res) {
    try {
      const directors = await directorService.getAllDirectors();
      return res.status(200).json({
        ok: true,
        datos: directors,
        mensaje: 'Directores recuperados correctamente'
      });
    } catch (err) {
      console.error('Error en getAllDirector:', err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: 'Error al recuperar directores'
      });
    }
  }
}

module.exports = new DirectorController();
