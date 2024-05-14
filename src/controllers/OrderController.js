const Message = require("../common/messages/ConstantMessage");
const JsonReponse = require("../common/reponses/JsonResponse");
const orderService = require("../services/OrderService");


const orderController = { 
    findAll: async (req, res) => {
        const orders = await orderService.findOrders(req.query);
        return res.status(200).send(JsonReponse(200, orders.count, orders.rows));
    },
    updateOrder: async (req, res) => {
        const order_id = req.params.id;
        const { status } = req.body;
        if(!order_id || !status){
            return res.status(400).send(JsonReponse(400, Message.FILED_EMPTY, null));
        }

        const order = await orderService.findOrder(order_id);
        if(!order){
            return res.status(400).send(JsonReponse(400, Message.NOT_FOUND_ORDER, null));
        }

        const isUpdated = await orderService.updateOrder(order_id, { status });
        if(!isUpdated){
            return res.status(400).send(JsonReponse(400, Message.UPDATE_STATUS_ORDER_FAIL));
        }

        return res.status(200).send(JsonReponse(200, Message.UPDATE_STATUS_ORDER_SUCCESS, isUpdated));
    }
}

module.exports = orderController;