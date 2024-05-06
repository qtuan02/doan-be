const Message = require("../common/messages/ConstantMessage");
const JsonReponse = require("../common/reponses/JsonResponse");
const orderService = require("../services/OrderService");


const orderController = { 
    findAll: async (req, res) => {
        const orders = await orderService.findOrders();
        return res.status(200).send(JsonReponse(200, Message.FIND_ORDER, orders));
    }
}

module.exports = orderController;