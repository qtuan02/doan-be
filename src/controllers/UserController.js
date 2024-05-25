const { omit } = require("lodash");
const Message = require("../common/messages/ConstantMessage");
const JsonResponse = require("../common/reponses/JsonResponse");
const jwtFitler = require("../common/securities/jwt");
const userService = require("../services/UserService");


const userController = {
    findAll: async (req, res) => {
        const users = await userService.findAll();
        return res.status(200).send(JsonResponse(200, "ok", users));
    },
    profile: async (req, res) => {
        const tokenObj = await jwtFitler.verifyJwt(jwtFitler.getTokenFromHeader(req));
        if(!tokenObj){
            return res.status(400).send(JsonResponse(400, Message.TOKEN_EXPIRED, null));
        }

        const user = await userService.findByPhoneOrEmail(tokenObj.email);
        if(!user){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_USER, null));
        }
        
        return res.status(200).send(JsonResponse(200, Message.FOUND_USER_SUCCESS, omit(user.toJSON(), ['password', 'role', 'status'])));
    },
    register: async (req, res) => {
        const { firstname, lastname, address, phone, email, password } = req.body;
        if(!firstname || !lastname || !address || !phone || !email || !password){
            return res.status(400).send(JsonResponse(400, Message.FILED_EMPTY, null));
        }

        const isEmail = await userService.findByPhoneOrEmail(email);
        if(isEmail){
            return res.status(400).send(JsonResponse(400, Message.EMAIL_EXIST, null));
        }

        const isPhone = await userService.findByPhoneOrEmail(phone);
        if(isPhone){
            return res.status(400).send(JsonResponse(400, Message.PHONE_EXIST, null));
        }

        const newUser = await userService.createUser({ firstname, lastname, address, phone, email, password });
        if(!newUser){
            return res.status(400).send(JsonResponse(400, Message.CREATE_USER_FAIL, null));
        }

        return res.status(200).send(JsonResponse(200, Message.CREATE_USER_SUCCESS, omit(newUser.toJSON(), ['password', 'role'])));
    },
    login: async (req, res) => {
        const { account, password } = req.body;
        if(!account || !password){
            return res.status(400).send(JsonResponse(400, Message.FILED_EMPTY, null));
        }

        const user = await userService.findByPhoneOrEmail(account);
        if(!user){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_USER, null));
        }

        const checkPassword = await userService.checkPassword(password, user.password);
        if(!checkPassword){
            return res.status(400).send(JsonResponse(400, Message.WRONG_PASSWORD, null));
        }

        if(user.status === 0){
            return res.status(400).send(JsonResponse(400, Message.STATUS_FALSE, null));
        }

        return res.status(200).send(JsonResponse(200, Message.LOGIN_SUCCESS, { "token": jwtFitler.signJwt(user.email, user.role)}));
    },
    changePassword: async (req, res) => {
        const tokenObj = await jwtFitler.verifyJwt(jwtFitler.getTokenFromHeader(req));
        if(!tokenObj){
            return res.status(400).send(JsonResponse(400, Message.TOKEN_EXPIRED, null));
        }

        const user = await userService.findByPhoneOrEmail(tokenObj.email);
        const { password, oldPassword } = req.body;

        if(!password || !oldPassword){
            return res.status(400).send(JsonResponse(400, Message.FILED_EMPTY, null));
        }

        const checkPassword = await userService.checkPassword(oldPassword, user.password);
        if(!checkPassword){
            return res.status(400).send(JsonResponse(400, Message.WRONG_PASSWORD, null));
        }

        const changePassword = await userService.changePassword(user.email, password );
        if(!changePassword){
            return res.status(400).send(JsonResponse(400, Message.CHANGE_PASSWORD_FAIL, null));
        }

        return res.status(200).send(JsonResponse(200, Message.CHANGE_PASSWORD_SUCCESS, null));
    },
    changeProfile: async (req, res) => {
        const tokenObj = await jwtFitler.verifyJwt(jwtFitler.getTokenFromHeader(req));
        if(!tokenObj){
            return res.status(400).send(JsonResponse(400, Message.TOKEN_EXPIRED, null));
        }

        const { firstname, lastname, address, birth, gender } = req.body;
        
        const newProfile = await userService.changeProfile(tokenObj.email, { firstname, lastname, address, birth, gender });
        if(!newProfile){
            return res.status(400).send(JsonResponse(400, Message.UPDATE_USER_FAIL, null));
        }

        return res.status(200).send(JsonResponse(200, Message.UPDATE_USER_SUCCESS, null));
    },
    createUser: async (req, res) => {
        const { firstname, lastname, address, phone, email, password, role } = req.body;
        if(!firstname || !lastname || !address || !phone || !email || !password){
            return res.status(400).send(JsonResponse(400, Message.FILED_EMPTY, null));
        }

        const isEmail = await userService.findByPhoneOrEmail(email);
        if(isEmail){
            return res.status(400).send(JsonResponse(400, Message.EMAIL_EXIST, null));
        }

        const isPhone = await userService.findByPhoneOrEmail(phone);
        if(isPhone){
            return res.status(400).send(JsonResponse(400, Message.PHONE_EXIST, null));
        }

        const newUser = await userService.createUser({ firstname, lastname, address, phone, email, password, role });
        if(!newUser){
            return res.status(400).send(JsonResponse(400, Message.CREATE_USER_FAIL, null));
        }

        return res.status(200).send(JsonResponse(200, Message.CREATE_USER_SUCCESS, newUser));
    },
    updateUser: async (req, res) => {
        const { firstname, lastname, address, phone, email, password, role } = req.body;
        const user_id = req.params.id;
        if(!user_id || !firstname || !lastname || !address || !phone || !email || !password){
            return res.status(400).send(JsonResponse(400, Message.FILED_EMPTY, null));
        }

        const isEmail = await userService.countByPhoneOrEmail(email);
        if(isEmail > 1){
            return res.status(400).send(JsonResponse(400, Message.EMAIL_EXIST, null));
        }

        const isPhone = await userService.countByPhoneOrEmail(phone);
        if(isPhone > 1){
            return res.status(400).send(JsonResponse(400, Message.PHONE_EXIST, null));
        }

        const updateUser = await userService.updateUser(user_id, { firstname, lastname, address, phone, email, password, role });
        if(!updateUser){
            return res.status(400).send(JsonResponse(400, Message.CREATE_USER_FAIL, null));
        }

        return res.status(200).send(JsonResponse(200, Message.UPDATE_USER_SUCCESS, updateUser));
    }
}

module.exports = userController;