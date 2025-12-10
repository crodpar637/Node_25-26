const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pedidos', {
    idpedido: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cliente: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    idplato: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'platos',
        key: 'idplato'
      }
    },
    unidades: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pedidos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idpedido" },
        ]
      },
      {
        name: "FK_PLATOS",
        using: "BTREE",
        fields: [
          { name: "idplato" },
        ]
      },
    ]
  });
};
