const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('movie', {
    id_movie: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    release_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    id_director: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'director',
        key: 'id_director'
      }
    }
  }, {
    sequelize,
    tableName: 'movie',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_movie" },
        ]
      },
      {
        name: "id_director",
        using: "BTREE",
        fields: [
          { name: "id_director" },
        ]
      },
    ]
  });
};
