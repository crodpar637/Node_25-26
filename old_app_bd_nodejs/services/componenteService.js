// Ejemplo en dataService.js
const componenteModel = require('../models/componenteModel');
const { logMensaje } = require('../utils/logger');

class ComponenteService {
    getAllComponente(callback) {
        componenteModel.getAllComponente((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    getAllComponenteListado(callback) {
        componenteModel.getAllComponenteListado((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    getAllComponenteGrafica(callback) {
        componenteModel.getAllComponenteGrafica((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    async createComponente(componenteData, callback) {
        // Aquí podrías realizar validaciones adicionales antes de llamar al modelo
        // Por ejemplo, verificar si los datos son válidos antes de intentar crear el componente

        componenteModel.createComponente(componenteData, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    async getComponenteById(componenteId, callback) {

        componenteModel.getComponenteById(componenteId, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    async getComponenteByIdRelations(componenteId, callback) {

        componenteModel.getComponenteByIdRelations(componenteId, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    deleteComponente(componenteId, callback) {
        componenteModel.deleteComponente(componenteId, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result.affectedRows); // Número de filas afectadas
            }
        });
    }


    // Otros métodos del servicio...
}

module.exports = new ComponenteService();
