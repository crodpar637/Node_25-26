// Ejemplo en tipoModel.js
const db = require('../config/dbConfig');
const { logErrorSQL } = require('../utils/logger');

class TipoModel {
    getAllTipo(callback) {
        const query = 'SELECT * FROM tipo';
        db.query(query, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    // Otros métodos del modelo...
}

module.exports = new TipoModel();
