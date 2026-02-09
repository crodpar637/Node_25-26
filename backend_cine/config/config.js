const { logMensaje } = require("../utils/logger.js");
//Importar libreria para manejo de ficheros de configuración dependiendo de la variable de entorno NODE_ENV
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const config = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "test",
    name: process.env.DB_NAME || "cine_examen",
    port: process.env.DB_PORT || 3306,
  },
  secretKey: process.env.SECRET_KEY || "default_secret",
};

module.exports = config;

// Dejamos constancia en el log de las variables de entorno utilizadas
logMensaje("NODE_ENV:" + process.env.NODE_ENV);
logMensaje("CONFIG PORT:" + config.db.user);

logMensaje("CONFIG DBHOST:" + config.db.host);
logMensaje("CONFIG DBPORT:" + config.db.port);
logMensaje("CONFIG DBNAME:" + config.db.name);
logMensaje("CONFIG DBUSER:" + config.db.user);

logMensaje("NODE_ENV DBHOST:" + process.env.DB_HOST);
logMensaje("NODE_ENV DBPORT:" + process.env.DB_PORT);
logMensaje("NODE_ENV DBNAME:" + process.env.DB_NAME);
logMensaje("NODE_ENV DBUSER:" + process.env.DB_USER);
