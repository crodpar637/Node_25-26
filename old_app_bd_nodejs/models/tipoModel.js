// tipoModel.js (refactorizado para usar el wrapper `db.query` async)
const db = require('../config/dbConfig');
const { logErrorSQL } = require('../utils/logger');

class TipoModel {
    async getAllTipo() {
        const query = 'SELECT * FROM tipo';
        try {
            const rows = await db.query(query);
            return rows;
        } catch (err) {
            logErrorSQL(err);
            throw err;
        }
    }

    async getTipoById(id) {
        const query = 'SELECT * FROM tipo WHERE id = ?';
        try {
            const rows = await db.query(query, [id]);
            return rows;
        } catch (err) {
            logErrorSQL(err);
            throw err;
        }
    }

    async createTipo(tipoData) {
        const query = 'INSERT INTO tipo SET ?';
        try {
            const result = await db.query(query, tipoData);
            return result; // OkPacket (insertId, affectedRows, ...)
        } catch (err) {
            logErrorSQL(err);
            throw err;
        }
    }

    async updateTipo(id, tipoData) {
        const query = 'UPDATE tipo SET ? WHERE id = ?';
        try {
            const result = await db.query(query, [tipoData, id]);
            return result; // OkPacket
        } catch (err) {
            logErrorSQL(err);
            throw err;
        }
    }

    async deleteTipo(id) {
        const query = 'DELETE FROM tipo WHERE id = ?';
        try {
            const result = await db.query(query, [id]);
            return result; // OkPacket
        } catch (err) {
            logErrorSQL(err);
            throw err;
        }
    }
}

module.exports = new TipoModel();
