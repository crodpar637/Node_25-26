// ============================================
// IMPORTACIONES
// ============================================
// Importar fichero de configuración con variables de entorno
const config = require('./config');
const express = require("express");
const path = require("path");
const cors = require("cors");
const { logMensaje } = require("./utils/logger.js");

// Rutas de la API
const directorRoutes = require("./routes/directorRoutes");
const movieRoutes = require("./routes/movieRoutes");

// ============================================
// INICIALIZACIÓN
// ============================================
const app = express();
const port = config.port;

// ============================================
// MIDDLEWARE - PARSEO
// ============================================
app.use(express.json());

// ============================================
// MIDDLEWARE - CORS - Cualquier origen
// ============================================
app.use(cors());

// ============================================
// MIDDLEWARE - ARCHIVOS ESTÁTICOS
// ============================================
app.use(express.static(path.join(__dirname, "public")));

// ============================================
// RUTAS - API REST
// ============================================
app.use("/api/directors", directorRoutes);
app.use("/api/movies", movieRoutes);

// ============================================
// RUTAS - SPA (Catch-all)
// ============================================
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// ============================================
// SERVIDOR
// ============================================
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    logMensaje(`Servidor escuchando en el puerto ${port}`);
  });
}

// Exportamos la aplicación para poder hacer pruebas
module.exports = app;
