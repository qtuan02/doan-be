const Message = require("../common/messages/ConstantMessage");
const JsonResponse = require("../common/reponses/JsonResponse");
const jwtFitler = require("../common/securities/jwt");
const cartService = require("../services/CartService");
const orderService = require("../services/OrderService");
const userService = require("../services/UserService");
const pusher = require("../configs/pusher");

const orderController = {
    findOrderByCustomer: async (req, res) => {
        const tokenObj = await jwtFitler.verifyJwt(jwtFitler.getTokenFromHeader(req));
        if(!tokenObj){
            return res.status(400).send(JsonResponse(400, Message.TOKEN_EXPIRED, null));
        }

        const user = await userService.findByPhoneOrEmail(tokenObj.email);
        if(!user){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_USER, null));
        }
        
        const orders = await orderService.findOrderByCustomer(user.user_id);
        if(!orders){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_ORDER, null));
        }

        return res.status(200).send(JsonResponse(200, "", orders));;
    },
    findOrderDetailByCustomer: async (req, res) => {
        const tokenObj = await jwtFitler.verifyJwt(jwtFitler.getTokenFromHeader(req));
        if(!tokenObj){
            return res.status(400).send(JsonResponse(400, Message.TOKEN_EXPIRED, null));
        }

        const user = await userService.findByPhoneOrEmail(tokenObj.email);
        if(!user){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_USER, null));
        }

        const order = await orderService.checkOrderByCustomer(req.params.id, user.user_id);
        if(!order){
            return res.status(400).send(JsonResponse(400, Message.UNAUTHORIZED, null));
        }

        const orderdetail = await orderService.findOrderDetailByCustomer(req.params.id);
        if(!orderdetail){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_ORDER, null));
        }

        return res.status(200).send(JsonResponse(200, "", orderdetail));
    },
    findOrderDetail: async (req, res) => {
        const order = await orderService.findOrderDetail(req.params.id);
        return res.status(200).send(JsonResponse(200, "", order));
    },
    findAll: async (req, res) => {
        const orders = await orderService.findOrders(req.query);
        return res.status(200).send(JsonResponse(200, orders.count, orders.rows));
    },
    paymentOfCart: async (req, res) => {
        const tokenObj = await jwtFitler.verifyJwt(jwtFitler.getTokenFromHeader(req));
        if(!tokenObj){
            return res.status(400).send(JsonResponse(400, Message.TOKEN_EXPIRED, null));
        }

        const user = await userService.findByPhoneOrEmail(tokenObj.email);
        if(!user){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_USER, null));
        }

        const carts = await cartService.findCartByCustomer(user.user_id);
        if(carts.count === 0){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_PRODUCT_CART, null));
        }

        let { total_price, order_address, payment_method, fullname, phone } = req.body;
        if(!total_price || !payment_method || !order_address || !fullname || !phone){
            return res.status(400).send(JsonResponse(400, Message.FILED_EMPTY, null));
        }

        const order = await orderService.createOrder(user.user_id, total_price, order_address, payment_method, fullname, phone);
        if(!order){
            return res.status(400).send(JsonResponse(400, Message.ADD_ORDER_FAIL, null));
        }

        const order_detail = await orderService.createOrderDetail(order.order_id, carts.rows);
        if(!order_detail){
            await orderService.deleteAll(order.order_id);
            await orderService.deleteOrder(order.order_id);
            return res.status(400).send(JsonResponse(400, Message.ADD_ORDER_FAIL, null));
        }
        
        const deleteCart = await cartService.deleteAll(user.user_id);
        if(!deleteCart){
            console.log("Delete all cart fail!")
        }

        return res.status(200).send(JsonResponse(200, Message.ADD_ORDER_SUCCESS, null));
    },
    paymentOfAnonymous: async (req, res) => {
        const { total_price, order_address, payment_method, fullname, phone, carts } = req.body;
        if(!total_price || !payment_method || !order_address || !fullname || !phone || !carts){
            return res.status(400).send(JsonResponse(400, Message.FILED_EMPTY, null));
        }

        const order = await orderService.createOrderAnonymous(total_price, order_address, payment_method, fullname, phone);
        if(!order){
            return res.status(400).send(JsonResponse(400, Message.ADD_ORDER_FAIL, null));
        }
        
        await pusher.trigger("order", "payment_order_token", Message.ADD_ORDER_SUCCESS);
        
        const order_detail = await orderService.createOrderDetailAnonymous(order.order_id, carts);
        if(!order_detail){
            await orderService.deleteAll(order.order_id);
            await orderService.deleteOrder(order.order_id);
            return res.status(400).send(JsonResponse(400, Message.ADD_ORDER_FAIL, null));
        }

        return res.status(200).send(JsonResponse(200, Message.ADD_ORDER_SUCCESS, null));
    },
    updateStatusOrder: async (req, res) => {
        const { status } = req.body;
        const order = await orderService.findOne(req.params.id);

        if(!order){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_ORDER, null));
        }

        const isUpdated = await orderService.updateStatusOrder(order.order_id, status);
        if(!isUpdated){
            return res.status(400).send(JsonResponse(400, Message.UPDATE_ORDER_FAIL, null));
        }

        return res.status(200).send(JsonResponse(200, Message.UPDATE_ORDER_SUCCSES, isUpdated));
    }
}

module.exports = orderController;