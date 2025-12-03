// tipoService.js (refactorizado a async/await)
const tipoModel = require('../models/tipoModel');

class TipoService {
    async getAllTipo() {
        try {
            const data = await tipoModel.getAllTipo();
            return data;
        } catch (err) {
            throw err;
        }
    }

    async getTipoById(id) {
        try {
            const data = await tipoModel.getTipoById(id);
            return data;
        } catch (err) {
            throw err;
        }
    }

    async createTipo(tipoData) {
        try {
            const result = await tipoModel.createTipo(tipoData);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async updateTipo(id, tipoData) {
        try {
            const result = await tipoModel.updateTipo(id, tipoData);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async deleteTipo(id) {
        try {
            const result = await tipoModel.deleteTipo(id);
            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new TipoService();
