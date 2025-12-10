var DataTypes = require("sequelize").DataTypes;
var _pedidos = require("./pedidos");
var _platos = require("./platos");
var _users = require("./users");

function initModels(sequelize) {
  var pedidos = _pedidos(sequelize, DataTypes);
  var platos = _platos(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  pedidos.belongsTo(platos, { as: "idplato_plato", foreignKey: "idplato"});
  platos.hasMany(pedidos, { as: "pedidos", foreignKey: "idplato"});

  return {
    pedidos,
    platos,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
