// Ejemplo en componenteModel.js
const db = require('../config/dbConfig');
const { logErrorSQL, logMensaje } = require('../utils/logger');

class ComponenteModel {
    getAllComponente(callback) {
        const query = 'SELECT * FROM componente';
        db.query(query, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    getAllComponenteListado(callback) {
        const query = 'SELECT c.*, t.tipo, t.descripcion as tipo_descripcion FROM componente c JOIN tipo t ON c.idtipo = t.idtipo';
        db.query(query, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    getAllComponenteGrafica(callback) {
        const query = 'SELECT tipo,count(*) as stock FROM componente as c, tipo as t WHERE c.idtipo = t.idtipo group by tipo order by tipo; ';
        db.query(query, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    async createComponente(componenteData,callback) {
        // Atencion, idcomponente es PK y es Auto Incremental, se pone como null
        const query = 'INSERT INTO componente (idcomponente, nombre, descripcion, precio, idtipo) VALUES (?, ?, ?, ?, ?)';
        const values = [null, componenteData.nombre, componenteData.descripcion, componenteData.precio, componenteData.idtipo];

        const result = db.query(query, values, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    getComponenteById(componenteId, callback) {
        const query = 'SELECT * FROM componente WHERE idcomponente = ?';
        db.query(query, [componenteId], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else if (result.length === 0) {
                callback(null, null);
            } else {
                const componente = result[0];
                callback(null, componente);
            }
        });
    }

    getComponenteByIdRelations(componenteId, callback) {
        const query = 'SELECT c.*,t.tipo,t.descripcion as tipodesc FROM componente as c, tipo as t WHERE c.idtipo = t.idtipo AND idcomponente = ?';
        db.query(query, [componenteId], (err, result,fields) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else if (result.length === 0) {
                callback(null, null);
            } else {
                const componente = result[0];  // Devuelvo la primera fila { col1: v1 , col2 : v2}
                callback(null, componente);
            }
        });
    }

    deleteComponente(componenteId, callback) {
        const query = 'DELETE FROM componente WHERE idcomponente = ?';
        db.query(query, [componenteId], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    // Otros métodos del modelo...
}

module.exports = new ComponenteModel();

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

