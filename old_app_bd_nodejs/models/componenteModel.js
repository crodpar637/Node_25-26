// componenteModel.js (refactorizado a async/await usando el wrapper db.query)
const db = require('../config/dbConfig');
const { logErrorSQL, logMensaje } = require('../utils/logger');

class ComponenteModel {
    async getAllComponente() {
        const query = 'SELECT * FROM componente';
        try {
            const rows = await db.query(query);
            return rows;
        } catch (err) {
            logErrorSQL(err);
            throw err;
        }
    }

    async getAllComponenteListado() {
        const query = 'SELECT c.*, t.tipo, t.descripcion as tipo_descripcion FROM componente c JOIN tipo t ON c.idtipo = t.idtipo';
        try {
            const rows = await db.query(query);
            return rows;
        } catch (err) {
            logErrorSQL(err);
            throw err;
        }
    }

    async getAllComponenteGrafica() {
        const query = 'SELECT tipo, count(*) as stock FROM componente as c, tipo as t WHERE c.idtipo = t.idtipo GROUP BY tipo ORDER BY tipo';
        try {
            const rows = await db.query(query);
            return rows;
        } catch (err) {
            logErrorSQL(err);
            throw err;
        }
    }

    async createComponente(componenteData) {
        // Atencion, idcomponente es PK y es Auto Incremental, se pone como null
        const query = 'INSERT INTO componente (idcomponente, nombre, descripcion, precio, idtipo) VALUES (?, ?, ?, ?, ?)';
        const values = [null, componenteData.nombre, componenteData.descripcion, componenteData.precio, componenteData.idtipo];
        try {
            const result = await db.query(query, values);
            return result; // OkPacket
        } catch (err) {
            logErrorSQL(err);
            throw err;
        }
    }

    async getComponenteById(componenteId) {
        const query = 'SELECT * FROM componente WHERE idcomponente = ?';
        try {
            const rows = await db.query(query, [componenteId]);
            if (!rows || rows.length === 0) return null;
            return rows[0];
        } catch (err) {
            logErrorSQL(err);
            throw err;
        }
    }

    async getComponenteByIdRelations(componenteId) {
        const query = 'SELECT c.*, t.tipo, t.descripcion as tipodesc FROM componente as c JOIN tipo as t ON c.idtipo = t.idtipo WHERE idcomponente = ?';
        try {
            const rows = await db.query(query, [componenteId]);
            if (!rows || rows.length === 0) return null;
            return rows[0];
        } catch (err) {
            logErrorSQL(err);
            throw err;
        }
    }

    async updateComponente(id, componenteData) {
        const query = 'UPDATE componente SET ? WHERE idcomponente = ?';
        try {
            const result = await db.query(query, [componenteData, id]);
            return result; // OkPacket
        } catch (err) {
            logErrorSQL(err);
            throw err;
        }
    }

    async deleteComponente(componenteId) {
        const query = 'DELETE FROM componente WHERE idcomponente = ?';
        try {
            const result = await db.query(query, [componenteId]);
            return result; // OkPacket
        } catch (err) {
            logErrorSQL(err);
            throw err;
        }
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

