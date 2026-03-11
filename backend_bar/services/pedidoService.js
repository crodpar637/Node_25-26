// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo plato
const Plato = models.platos;
// Recuperar el modelo pedido
const Pedido = models.pedidos;

class PedidoService {
  async getGraficaPedidos() {
    return await Pedido.findAll({
      attributes: [
        "idplato",
        [sequelize.fn("SUM", sequelize.col("unidades")), "ventas"],
        [
          sequelize.fn("SUM", sequelize.literal("unidades * precio")),
          "ingresos",
        ],
      ],
      include: [
        {
          model: Plato,
          as: "idplato_plato",
          attributes: ["nombre", "precio"],
        },
      ],
      group: ["idplato", "nombre", "precio"],
      raw: true,
    });
  }

  async getAllPedido() {
    return await Pedido.findAll({
      include: [
        {
          model: Plato,
          as: "idplato_plato",
        },
      ],
    });
  }
}

module.exports = new PedidoService();