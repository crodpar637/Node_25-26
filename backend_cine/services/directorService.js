// services/directorService.js
// Servicio para interactuar con el modelo Sequelize `directors`

// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");
// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo director
const Director = models.director;

class DirectorService {
  async getAllDirectors() {
    // Devuelve todos los directores. Ajusta atributos si tu modelo usa otros nombres.
    const result = await Director.findAll();
    return result;
  }
}

module.exports = new DirectorService();
