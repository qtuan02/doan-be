const Message = require("../common/messages/ConstantMessage");
const JsonResponse = require("../common/reponses/JsonResponse");
const jwtFitler = require("../common/securities/jwt");
const favoriteService = require("../services/FavoriteService");
const userService = require("../services/UserService");

const favoriteControler = {
    addFavorite: async (req, res) => {
        const tokenObj = await jwtFitler.verifyJwt(jwtFitler.getTokenFromHeader(req));
        if(!tokenObj){
            return res.status(400).send(JsonResponse(400, Message.TOKEN_EXPIRED, null));
        }

        const user = await userService.findByPhoneOrEmail(tokenObj.email);
        if(!user){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_USER, null));
        }

        const { product_id } = req.body;
        if(!product_id){
            return res.status(400).send(JsonResponse(400, Message.FILED_EMPTY, null));
        }
        
        const check = await favoriteService.findOneByUser(user.user_id, product_id);
        if(check){
            return res.status(400).send(JsonResponse(400, Message.PRODUCT_EXIST_FAVORITE, null));
        }

        const addItem = await favoriteService.addFavorite(user.user_id, product_id);
        if(!addItem){
            return res.status(400).send(JsonResponse(400, Message.CREATE_FAVORITE_FAIL, null));
        }
        
        return res.status(200).send(JsonResponse(200, Message.CREATE_FAVORITE_SUCCESS, true));
    },
    findByUser: async (req, res) => {
        const tokenObj = await jwtFitler.verifyJwt(jwtFitler.getTokenFromHeader(req));
        if(!tokenObj){
            return res.status(400).send(JsonResponse(400, Message.TOKEN_EXPIRED, null));
        }

        const user = await userService.findByPhoneOrEmail(tokenObj.email);
        if(!user){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_USER, null));
        }

        const favorites = await favoriteService.findAllByUser(user.user_id);
        return res.status(200).send(JsonResponse(200, favorites.count, favorites.rows));
    },
    deleteByUser: async (req, res) => {
        const tokenObj = await jwtFitler.verifyJwt(jwtFitler.getTokenFromHeader(req));
        if(!tokenObj){
            return res.status(400).send(JsonResponse(400, Message.TOKEN_EXPIRED, null));
        }

        const user = await userService.findByPhoneOrEmail(tokenObj.email);
        if(!user){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_USER, null));
        }

        
        const favorite_id = req.params.id;
        if(!favorite_id){
            return res.status(400).send(JsonResponse(400, Message.FILED_EMPTY, null));
        }
        
        const check = await favoriteService.findOne(favorite_id, user.user_id);
        if(!check){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_FAVORITE, null));
        }

        const isDeleted = await favoriteService.deleteByUser(favorite_id);
        if(!isDeleted){
            return res.status(400).send(JsonResponse(400, Message.DELETE_FAVORITE_FAIL, null));
        }

        return res.status(200).send(JsonResponse(200, Message.DELETE_FAVORITE_SUCCESS, true));
    }
}

module.exports = favoriteControler;