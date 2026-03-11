// services/movieService.js
// Servicio para interactuar con el modelo Sequelize `movies`

// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");
// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo movie
const Movie = models.movie;
const Director = models.director;

class MovieService {
  async getAllMovies() {
    // Devuelve todas las películas. Ajusta atributos si tu modelo usa otros nombres.
    const result = await Movie.findAll({
      include: [
        {
          model: Director,
          as: "id_director_director",
        },
      ],
    });
    return result;
  }

  async getMovieById(id_movie) {
    // Devuelve una película por su id
    const result = await Movie.findByPk(id_movie);
    return result;
  }

  async createMovie(movieData) {
    // Crea una nueva película
    const newMovie = await Movie.create(movieData);
    return newMovie;
  }

  async updateMovie(id_movie, movieData) {
    // Actualiza una película existente
    const movie = await Movie.findByPk(id_movie);
    if (movie) {
      await movie.update(movieData);
      return movie;
    }
    return null;
  }

  async deleteMovie(id_movie) {
    // Elimina una película por su id
    const movie = await Movie.findByPk(id_movie);
    if (movie) {
      await movie.destroy();
      return true;
    }
    return false;
  }
}

module.exports = new MovieService();
