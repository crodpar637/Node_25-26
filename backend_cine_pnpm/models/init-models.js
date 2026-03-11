var DataTypes = require("sequelize").DataTypes;
var _director = require("./director");
var _movie = require("./movie");

function initModels(sequelize) {
  var director = _director(sequelize, DataTypes);
  var movie = _movie(sequelize, DataTypes);

  movie.belongsTo(director, { as: "id_director_director", foreignKey: "id_director"});
  director.hasMany(movie, { as: "movies", foreignKey: "id_director"});

  return {
    director,
    movie,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
