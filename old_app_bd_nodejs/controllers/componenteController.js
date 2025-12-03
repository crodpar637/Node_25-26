// componenteController.js
const componenteService = require('../services/componenteService');
const { logMensaje } = require('../utils/logger');
const Respuesta = require('../utils/respuesta');

class ComponenteController {

  async getAllComponente(req, res) {

    // Recuperar información de los parámetros de la petición
    // query puede ser { listado : true } o { grafica : true }
    const { listado, grafica } = req.query; 

    // Si se trata de un listado (existe el parámetro listado), invoco otro servicio
    if (listado) {
      componenteService.getAllComponenteListado((err, data) => {
        if (err) {
          res.status(500).json(Respuesta.error(data, 'Error al recuperar los datos:' + req.originalUrl));
        } else {
          res.json(Respuesta.exito(data, 'Listado de componentes recuperado'));
        }
      });
    } else if (grafica){  // Se trata de una grafica
      componenteService.getAllComponenteGrafica((err, data) => {
        if (err) {
          res.status(500).json(Respuesta.error(data, 'Error al recuperar los datos:' + req.originalUrl));
        } else {
          res.json(Respuesta.exito(data, 'Datos para gráfica de componentes recuperado'));
        }
      });
      
    } else { // No se trata de un listado ni de una grafica
      // Implementa la lógica para obtener todos los datos 
      componenteService.getAllComponente((err, data) => {
        if (err) {
          res.status(500).json(Respuesta.error(data, 'Error al recuperar los datos:' + req.originalUrl));
        } else {
          res.json(Respuesta.exito(data, 'Datos de componentes recuperados'));
        }
      });
    }
  };

  async getComponenteById(req, res) {
    // Implementa la lógica para obtener un dato por ID
    // Recuperar información de la query string (?p1=v1&p2=v2)
    const { relations } = req.query;
    // Recuperar información que vienen en la ruta '/:id'
    const componenteId = req.params.id;

    // Si hay que recuperar los datos relacionados (relations), invoco otro servicio
    if (relations) {

      componenteService.getComponenteByIdRelations(componenteId, (err, componente) => {
        if (err) {
          res.status(500).json(Respuesta.error(componente, 'Error al recuperar los datos:' + req.originalUrl));
        } else if (componente == null) {
          logMensaje("Respuesta es:" + JSON.stringify(Respuesta.error(componente, 'Componente no encontrado' + req.originalUrl)))
          res.status(404).json(Respuesta.error(componente, 'Componente no encontrado: ' + componenteId));
        } else {
          res.json(Respuesta.exito(componente, 'Componente recuperado'));
        }
      });
    } else { // No necesito recuperar datos relacionados

      // Implementa la lógica para obtener el componente
      componenteService.getComponenteById(componenteId, (err, componente) => {
        if (err) {
          res.status(500).json(Respuesta.error(componente, 'Error al recuperar los datos:' + req.originalUrl));
        } else if (componente == null) {
          res.status(404).json(Respuesta.error(componente, 'Componente no encontrado: ' + componenteId));
        } else {
          res.json(Respuesta.exito(componente, 'Componente recuperado'));
        }
      });
    }
  };

  async createComponente(req, res) {
    // Implementa la lógica para crear un nuevo dato

    // Recuperar objeto con el componente a dar de alta
    const componenteData = req.body;

    componenteService.createComponente(componenteData, (err, result) => {
      if (err) {
        res.status(500).json(Respuesta.error(result, 'Error al insertar el componente:' + req.originalUrl));
      } else {
        // 201: Created
        res.status(201).json(Respuesta.exito({ insertId: result.insertId }, 'Componente dado de alta'));
      }
    });


  };

  async updateComponente(req, res) {
    // Implementa la lógica para actualizar un dato por ID
  };

  async deleteComponente(req, res) {
    // Implementa la lógica para eliminar un dato por ID
    // Recuperar información que vienen en la ruta '/:id'
    const componenteId = req.params.id;
    // Implementa la lógica para eliminar el componente
    componenteService.deleteComponente(componenteId, (err, result) => {
      if (err) {
          console.error('Error al eliminar componente:', err);
          res.status(500).json({ error: 'Error interno del servidor' });
      // } else if (result === 0) {
      //     res.status(404).json({ error: 'Componente no encontrado' });
      } else {
          res.status(204).end(); // 204: No Content
      }
  });

  };

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
