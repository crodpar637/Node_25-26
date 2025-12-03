// componenteService.js (refactorizado a async/await)
const componenteModel = require('../models/componenteModel');
const { logMensaje } = require('../utils/logger');

class ComponenteService {
    async getAllComponente() {
        try {
            const data = await componenteModel.getAllComponente();
            return data;
        } catch (err) {
            throw err;
        }
    }

    async getAllComponenteListado() {
        try {
            const data = await componenteModel.getAllComponenteListado();
            return data;
        } catch (err) {
            throw err;
        }
    }

    async getAllComponenteGrafica() {
        try {
            const data = await componenteModel.getAllComponenteGrafica();
            return data;
        } catch (err) {
            throw err;
        }
    }

    async createComponente(componenteData) {
        try {
            const result = await componenteModel.createComponente(componenteData);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async getComponenteById(componenteId) {
        try {
            const result = await componenteModel.getComponenteById(componenteId);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async getComponenteByIdRelations(componenteId) {
        try {
            const result = await componenteModel.getComponenteByIdRelations(componenteId);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async updateComponente(id, componenteData) {
        try {
            const result = await componenteModel.updateComponente(id, componenteData);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async deleteComponente(componenteId) {
        try {
            const result = await componenteModel.deleteComponente(componenteId);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Otros métodos del servicio...
}

module.exports = new ComponenteService();
