
const Message = require("../common/messages/ConstantMessage");
const JsonResponse = require("../common/reponses/JsonResponse");
const jwtFitler = require("../common/securities/jwt");
const userService = require("../services/UserService");
const productService = require("../services/ProductService");
const cartService = require("../services/CartService");

const cartController = {
    addItem: async (req, res) => {
        const tokenObj = await jwtFitler.verifyJwt(jwtFitler.getTokenFromHeader(req));
        if(!tokenObj){
            return res.status(400).send(JsonResponse(400, Message.TOKEN_EXPIRED, null));
        }

        const user = await userService.findByPhoneOrEmail(tokenObj.email);
        if(!user){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_USER, null));
        }

        const { product_id, quantity } = req.body;
        if(!product_id || !quantity){
            return res.status(400).send(JsonResponse(400, Message.FILED_EMPTY, null));
        }

        const product = await productService.findOne(product_id);
        if(product.status !== "true"){
            return res.status(400).send(JsonResponse(400, Message.PRODUCT_OVER, null));
        }

        const checkItemOnCart = await cartService.checkItem(user.user_id, product_id);
        if(checkItemOnCart){
            return res.status(400).send(JsonResponse(400, Message.PRODUCT_EXIST, null));
        }

        if(product.quantity < quantity){
            return res.status(400).send(JsonResponse(400, Message.QUANTITY_MUCH, null));
        }

        const cart = await cartService.addItem(user.user_id, product_id, quantity);
        if(!cart){
            return res.status(400).send(JsonResponse(400, Message.ADD_ITEM_FAIL, null));
        }

        return res.status(200).send(JsonResponse(200, Message.ADD_ITEM_SUCCESS, cart));
    },
    deleteItem: async (req, res) => {
        const tokenObj = await jwtFitler.verifyJwt(jwtFitler.getTokenFromHeader(req));
        if(!tokenObj){
            return res.status(400).send(JsonResponse(400, Message.TOKEN_EXPIRED, null));
        }

        const user = await userService.findByPhoneOrEmail(tokenObj.email);
        if(!user){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_USER, null));
        }

        const cart_id = await req.params.id;
        if(!cart_id){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_CART, null));
        }

        const isDeleted = await cartService.deleteItem(cart_id, user.user_id);
        if(!isDeleted){
            return res.status(400).send(JsonResponse(400, Message.DELETE_CART_FAIL, null));
        }

        return res.status(200).send(JsonResponse(200, Message.DELETE_CART_SUCCESS, isDeleted));
    },
    changeQuantity: async (req, res) => {
        const tokenObj = await jwtFitler.verifyJwt(jwtFitler.getTokenFromHeader(req));
        if(!tokenObj){
            return res.status(400).send(JsonResponse(400, Message.TOKEN_EXPIRED, null));
        }

        const user = await userService.findByPhoneOrEmail(tokenObj.email);
        if(!user){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_USER, null));
        }

        const item = await cartService.findItem(req.params.id, user.user_id);
        if(!item){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_CART, null));
        }

        const { quantity } = req.body;
        if(!quantity){
            return res.status(400).send(JsonResponse(400, Message.FILED_EMPTY, null))
        }
        
        const product = await productService.findOne(item.product_id);
        if(product.quantity < quantity){
            return res.status(400).send(JsonResponse(400, Message.QUANTITY_MUCH, null));
        }

        const changeQuantity = await cartService.changeQuantity(user.user_id, item.cart_id, quantity);
        if(!changeQuantity){
            return res.status(400).send(JsonResponse(400, Message.CHANGE_QUANTITY_FAIL, null));
        }

        return res.status(200).send(JsonResponse(200, Message.CHANGE_QUANTITY_SUCCESS, changeQuantity));
    },
    findCartByCustomer: async (req, res) => {
        const tokenObj = await jwtFitler.verifyJwt(jwtFitler.getTokenFromHeader(req));
        if(!tokenObj){
            return res.status(400).send(JsonResponse(400, Message.TOKEN_EXPIRED, null));
        }

        const user = await userService.findByPhoneOrEmail(tokenObj.email);
        if(!user){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_USER, null));
        }

        const checkCart = await cartService.checkStatusAndDelete();
        if(checkCart){
            console.log("update cart");
        }

        const cartsOfCustomer = await cartService.findCartByCustomer(user.user_id);
        return res.status(200).send(JsonResponse(200, cartsOfCustomer.count, cartsOfCustomer.rows));
    }
}

module.exports = cartController;