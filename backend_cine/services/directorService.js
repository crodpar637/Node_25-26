// services/directorService.js
// Servicio para interactuar con el modelo Sequelize `directors`

const { directors } = require('../models');

class DirectorService {
  async getAllDirectors() {
    // Devuelve todos los directores. Ajusta atributos si tu modelo usa otros nombres.
    const result = await directors.findAll({});
    return result;
  }
}

module.exports = new DirectorService();
