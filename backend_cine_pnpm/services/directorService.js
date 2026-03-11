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
const Movie = models.movie;

class DirectorService {

  async getDirectorsDataGraph(){
    const result = await Movie.findAll({
        attributes: [
          "id_director",
          [sequelize.fn("COUNT", sequelize.col("id_movie")),"total"],
        ],
        include: [
          {
            model: Director,
            as: "id_director_director",
            attributes: ["name"], // Traemos el nombre del director
          },
        ],
        group: ["movie.id_director","id_director_director.name"],
        raw: true,
      });
    return result;
  }

  async getAllDirectors() {
    // Devuelve todos los directores. Ajusta atributos si tu modelo usa otros nombres.
    const result = await Director.findAll();
    return result;
  }
  async getDirectorById(id_director) {
    // Devuelve un director por su id
    const result = await Director.findByPk(id_director);
    return result;
  }
  async createDirector(director) {
    //Crea un director
    const result = await Director.create(director);
    return result;
  }
  async deleteDirector(id_director) {
    //Borrar un director
    const numFilas = await Director.destroy({
      where: { id_director: id_director },
    });
    return numFilas;
  }
  async updateDirector(director) {
    //Actualizar un director
    let numFilas = await Director.update(director, {
      where: { id_director: director.id_director },
    });
    // Si el numero de filas afectadas por la actualización es cero
    // y existe el registro para ese director, es que no hay cambios en los datos
    // la actualización
    if(numFilas == 0 && await Director.findByPk(director.id_director)){
      numFilas = 1; // Devuelvo uno para indicar que todo ha ido bien
    }

    return numFilas;
  }
}

module.exports = new DirectorService();
