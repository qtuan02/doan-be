const Message = require("../common/messages/ConstantMessage");
const JsonReponse = require("../common/reponses/JsonResponse");
const jwtFitler = require("../common/securities/jwt");
const cartService = require("../services/CartService");
const customerService = require("../services/CustomerService");
const orderService = require("../services/OrderService");
const productService = require("../services/ProductService");


const cartController = {
    addItem: async (req, res) => {
        const tokenObj = await jwtFitler.verifyJwt(jwtFitler.getTokenFromHeader(req));
        if(!tokenObj){
            return res.status(400).send(JsonReponse(400, Message.TOKEN_EXPIRED, null));
        }

        const customer = await customerService.findByEmail(tokenObj.email);
        if(!customer){
            return res.status(400).send(JsonReponse(400, Message.NOT_FOUND_CUSTOMER, null));
        }

        const { product_id, quantity } = req.body;
        if(!product_id || !quantity){
            return res.status(400).send(JsonReponse(400, Message.FILED_EMPTY, null));
        }

        const product = await productService.findProductById(product_id);
        if(product.status !== "true"){
            return res.status(400).send(JsonReponse(400, Message.PRODUCT_OVER, null));
        } 

        if(product.quantity < quantity){
            return res.status(400).send(JsonReponse(400, Message.QUANTITY_MUCH, null));
        }

        const checkItemOnCart = await cartService.checkItem(customer.customer_id, product_id);
        if(checkItemOnCart){
            return res.status(400).send(JsonReponse(400, Message.PRODUCT_EXIST, null));
        }

        const cart = await cartService.addItem(customer.customer_id, product_id, quantity);
        if(!cart){
            return res.status(400).send(JsonReponse(400, Message.ADD_ITEM_FAIL, null));
        }

        return res.status(200).send(JsonReponse(200, Message.ADD_ITEM_SUCCESS, cart));
    },
    deleteItem: async (req, res) => {
        const tokenObj = await jwtFitler.verifyJwt(jwtFitler.getTokenFromHeader(req));
        if(!tokenObj){
            return res.status(400).send(JsonReponse(400, Message.TOKEN_EXPIRED, null));
        }

        const customer = await customerService.findByEmail(tokenObj.email);
        if(!customer){
            return res.status(400).send(JsonReponse(400, Message.NOT_FOUND_CUSTOMER, null));
        }

        const cart_id = await req.params.id;
        if(!cart_id){
            return res.status(400).send(JsonReponse(400, Message.NOT_FOUND_CART, null));
        }

        const isDeleted = await cartService.deleteItem(cart_id, customer.customer_id);
        if(!isDeleted){
            return res.status(400).send(JsonReponse(400, Message.DELETE_CART_FAIL, null));
        }

        return res.status(200).send(JsonReponse(200, Message.DELETE_CART_SUCCESS, isDeleted));
    },
    changeQuantity: async (req, res) => {
        const tokenObj = await jwtFitler.verifyJwt(jwtFitler.getTokenFromHeader(req));
        if(!tokenObj){
            return res.status(400).send(JsonReponse(400, Message.TOKEN_EXPIRED, null));
        }

        const customer = await customerService.findByEmail(tokenObj.email);
        if(!customer){
            return res.status(400).send(JsonReponse(400, Message.NOT_FOUND_CUSTOMER, null));
        }

        const item = await cartService.findItem(req.params.id);
        if(!item){
            return res.status(400).send(JsonReponse(400, Message.NOT_FOUND_CART, null));
        }

        const { quantity } = req.body;
        if(!quantity){
            return res.status(400).send(JsonReponse(400, Message.FILED_EMPTY, null))
        }
        
        const product = await productService.findProductById(item.product_id);
        if(product.quantity < quantity){
            return res.status(400).send(JsonReponse(400, Message.QUANTITY_MUCH, null));
        }

        const changeQuantity = await cartService.changeQuantity(customer.customer_id, item.cart_id, quantity);
        if(!changeQuantity){
            return res.status(400).send(JsonReponse(400, Message.CHANGE_QUANTITY_FAIL, null));
        }

        return res.status(200).send(JsonReponse(200, Message.CHANGE_QUANTITY_SUCCESS, changeQuantity));
    },
    findCartByCustomer: async (req, res) => {
        const tokenObj = await jwtFitler.verifyJwt(jwtFitler.getTokenFromHeader(req));
        if(!tokenObj){
            return res.status(400).send(JsonReponse(400, Message.TOKEN_EXPIRED, null));
        }

        const customer = await customerService.findByEmail(tokenObj.email);
        if(!customer){
            return res.status(400).send(JsonReponse(400, Message.NOT_FOUND_CUSTOMER, null));
        }

        const cartsOfCustomer = await cartService.findCartByCustomer(customer.customer_id);
        return res.status(200).send(JsonReponse(200, "Danh sách giỏ hàng.", cartsOfCustomer));
    },
    payOrder: async(req, res) => {
        const tokenObj = await jwtFitler.verifyJwt(jwtFitler.getTokenFromHeader(req));
        if(!tokenObj){
            return res.status(400).send(JsonReponse(400, Message.TOKEN_EXPIRED, null));
        }

        const customer = await customerService.findByEmail(tokenObj.email);
        if(!customer){
            return res.status(400).send(JsonReponse(400, Message.NOT_FOUND_CUSTOMER, null));
        }

        const carts = await cartService.findCartByCustomer(customer.customer_id);
        if(carts.length === 0){
            return res.status(400).send(JsonReponse(400, Message.NOT_FOUND_PRODUCT_CART, null));
        }

        let { total_price, order_address, payment_method } =  req.body;
        if(!total_price || !payment_method){
            return res.status(400).send(JsonReponse(400, Message.FILED_EMPTY, null));
        }

        if (!order_address) {
            order_address = customer.address;
        }

        const order = await orderService.createOrder(customer.customer_id, total_price, order_address, payment_method);
        if(!order){
            return res.status(400).send(JsonReponse(400, Message.ADD_ORDER_FAIL, null));
        }

        const order_detail = await orderService.createOrderDetail(order.order_id, carts);
        if(!order_detail){
            await orderService.deleteAll(order.order_id);
            await orderService.deleteOrder(order.order_id);
            return res.status(400).send(JsonReponse(400, Message.ADD_ORDER_FAIL, null));
        }
        
        const deleteCart = await cartService.deleteAll(customer.customer_id);
        if(!deleteCart){
            return res.status(400).send(JsonReponse(400, Message.DELETE_CART_FAIL, null));
        }

        return res.status(200).send(JsonReponse(200, Message.ADD_ORDER_SUCCESS, null));
    }
}

module.exports = cartController;