// tipoController.js
const tipoService = require('../services/tipoService');
const Respuesta = require('../utils/respuesta');

class TipoController {

  async getAllTipo(req, res) {
    // Implementa la lógica para obtener todos los datos 
    tipoService.getAllTipo((err, data) => {
      if (err) {
        res.status(500).json(Respuesta.error(data, 'Error al recuperar los datos:' + req.originalUrl));
      } else {
        res.json(Respuesta.exito(data, 'Datos de tipos recuperados'));
      }
    });
  };


  async getTipoById(req, res) {
    // Implementa la lógica para obtener un dato por ID
  };

  async createTipo(req, res) {
    // Implementa la lógica para crear un nuevo dato
  };

  async updateTipo(req, res) {
    // Implementa la lógica para actualizar un dato por ID
  };

  async deleteTipo(req, res) {
    // Implementa la lógica para eliminar un dato por ID
  };
}

module.exports = new TipoController();
// Estructura de result (mysql)
// {
//   fieldCount: 0,
//   affectedRows: 1, // Número de filas afectadas por la consulta
//   insertId: 1,    // ID generado por la operación de inserción
//   serverStatus: 2,
//   warningCount: 0,
//   message: '',
//   protocol41: true,
//   changedRows: 0  // Número de filas cambiadas por la consulta
// }
