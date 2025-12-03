// componenteController.js
const componenteService = require('../services/componenteService');
const { logMensaje } = require('../utils/logger');
const Respuesta = require('../utils/respuesta');

class ComponenteController {

  async getAllComponente(req, res) {
    const { listado, grafica } = req.query;
    try {
      if (listado) {
        const data = await componenteService.getAllComponenteListado();
        return res.json(Respuesta.exito(data, 'Listado de componentes recuperado'));
      } else if (grafica) {
        const data = await componenteService.getAllComponenteGrafica();
        return res.json(Respuesta.exito(data, 'Datos para gráfica de componentes recuperado'));
      } else {
        const data = await componenteService.getAllComponente();
        return res.json(Respuesta.exito(data, 'Datos de componentes recuperados'));
      }
    } catch (err) {
      return res.status(500).json(Respuesta.error(err, 'Error al recuperar los datos: ' + req.originalUrl));
    }
  }

  async getComponenteById(req, res) {
    const { relations } = req.query;
    const componenteId = req.params.id;
    try {
      if (relations) {
        const componente = await componenteService.getComponenteByIdRelations(componenteId);
        if (!componente) {
          logMensaje('Respuesta es:' + JSON.stringify(Respuesta.error(null, 'Componente no encontrado: ' + componenteId)));
          return res.status(404).json(Respuesta.error(null, 'Componente no encontrado: ' + componenteId));
        }
        return res.json(Respuesta.exito(componente, 'Componente recuperado'));
      } else {
        const componente = await componenteService.getComponenteById(componenteId);
        if (!componente) {
          return res.status(404).json(Respuesta.error(null, 'Componente no encontrado: ' + componenteId));
        }
        return res.json(Respuesta.exito(componente, 'Componente recuperado'));
      }
    } catch (err) {
      return res.status(500).json(Respuesta.error(err, 'Error al recuperar los datos: ' + req.originalUrl));
    }
  }

  async createComponente(req, res) {
    const componenteData = req.body;
    try {
      const result = await componenteService.createComponente(componenteData);
      return res.status(201).json(Respuesta.exito({ insertId: result.insertId }, 'Componente dado de alta'));
    } catch (err) {
      return res.status(500).json(Respuesta.error(err, 'Error al insertar el componente: ' + req.originalUrl));
    }
  }

  async updateComponente(req, res) {
    const id = req.params.id;
    const componenteData = req.body;
    try {
      const result = await componenteService.updateComponente(id, componenteData);
      if (!result || result.affectedRows === 0) {
        return res.status(404).json(Respuesta.error(null, `Componente con id ${id} no encontrado`));
      }
      return res.json(Respuesta.exito(result, 'Componente actualizado correctamente'));
    } catch (err) {
      return res.status(500).json(Respuesta.error(err, 'Error al actualizar el componente'));
    }
  }

  async deleteComponente(req, res) {
    const componenteId = req.params.id;
    try {
      const result = await componenteService.deleteComponente(componenteId);
      if (!result || result.affectedRows === 0) {
        return res.status(404).json(Respuesta.error(null, `Componente con id ${componenteId} no encontrado`));
      }
      return res.status(204).end();
    } catch (err) {
      console.error('Error al eliminar componente:', err);
      return res.status(500).json(Respuesta.error(err, 'Error interno del servidor'));
    }
  }

}

module.exports = new ComponenteController();
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
