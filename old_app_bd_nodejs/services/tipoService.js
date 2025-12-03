// tipoService.js
const tipoModel = require('../models/tipoModel');

class TipoService {
    getAllTipo(callback) {
        tipoModel.getAllTipo((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }
    // Otros métodos del servicio...
}

module.exports = new TipoService();
