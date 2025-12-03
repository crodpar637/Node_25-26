// tipoController.js (refactorizado a async/await)
const tipoService = require('../services/tipoService');
const Respuesta = require('../utils/respuesta');

class TipoController {

  async getAllTipo(req, res) {
    try {
      const data = await tipoService.getAllTipo();
      return res.json(Respuesta.exito(data, 'Datos de tipos recuperados'));
    } catch (err) {
      return res.status(500).json(Respuesta.error(err, 'Error al recuperar los datos: ' + req.originalUrl));
    }
  }

  async getTipoById(req, res) {
    const id = req.params.id;
    try {
      const data = await tipoService.getTipoById(id);
      if (!data || (Array.isArray(data) && data.length === 0)) {
        return res.status(404).json(Respuesta.error(null, `Tipo con id ${id} no encontrado`));
      }
      return res.json(Respuesta.exito(data[0] || data, 'Tipo recuperado'));
    } catch (err) {
      return res.status(500).json(Respuesta.error(err, 'Error al recuperar el tipo: ' + req.originalUrl));
    }
  }

  async createTipo(req, res) {
    const tipoData = req.body;
    try {
      const result = await tipoService.createTipo(tipoData);
      // result.insertId normalmente contiene el id creado
      return res.status(201).json(Respuesta.exito({ insertId: result.insertId }, 'Tipo creado correctamente'));
    } catch (err) {
      return res.status(500).json(Respuesta.error(err, 'Error al crear el tipo'));
    }
  }

  async updateTipo(req, res) {
    const id = req.params.id;
    const tipoData = req.body;
    try {
      const result = await tipoService.updateTipo(id, tipoData);
      if (result.affectedRows === 0) {
        return res.status(404).json(Respuesta.error(null, `Tipo con id ${id} no encontrado`));
      }
      return res.json(Respuesta.exito(result, 'Tipo actualizado correctamente'));
    } catch (err) {
      return res.status(500).json(Respuesta.error(err, 'Error al actualizar el tipo'));
    }
  }

  async deleteTipo(req, res) {
    const id = req.params.id;
    try {
      const result = await tipoService.deleteTipo(id);
      if (result.affectedRows === 0) {
        return res.status(404).json(Respuesta.error(null, `Tipo con id ${id} no encontrado`));
      }
      return res.json(Respuesta.exito(result, 'Tipo eliminado correctamente'));
    } catch (err) {
      return res.status(500).json(Respuesta.error(err, 'Error al eliminar el tipo'));
    }
  }
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
