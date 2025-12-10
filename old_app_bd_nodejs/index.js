// ============================================
// IMPORTACIONES
// ============================================
const express = require("express");
const path = require("path");
const cors = require("cors");

// Rutas de la API
const componenteRoutes = require("./routes/componenteRoutes");
const tipoRoutes = require("./routes/tipoRoutes");

// ============================================
// INICIALIZACIÓN
// ============================================
const app = express();
const port = process.env.PORT || 3000;

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
app.use("/api/componentes", componenteRoutes);
app.use("/api/tipos", tipoRoutes);

// ============================================
// RUTAS - SPA (Catch-all)
// ============================================
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ============================================
// SERVIDOR
// ============================================
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
