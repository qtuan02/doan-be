const { omit } = require("lodash");
const Message = require("../common/messages/ConstantMessage");
const JsonResponse = require("../common/reponses/JsonResponse");
const jwtFitler = require("../common/securities/jwt");
const userService = require("../services/UserService");
const pusher = require("../configs/pusher");

const userController = {
    findAll: async (req, res) => {
        const users = await userService.findAll(req.query);
        return res.status(200).send(JsonResponse(200, users.count, users.rows));
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
        const { phone, email, password } = req.body;
        if(!phone || !email || !password){
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

        const newUser = await userService.createUser({ phone, email, password });
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

        if(user.status === false){
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

        const user = await userService.findByPhoneOrEmail(tokenObj.email);
        if(!user){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_USER, null));
        }

        const { firstname, lastname, address, birth, gender, phone } = req.body;
        
        if(phone){
            const isPhone = await userService.checkPhone(phone, user.user_id);
            if(isPhone > 0){
                return res.status(400).send(JsonResponse(400, Message.PHONE_EXIST, null));
            }
        }
        
        const newProfile = await userService.changeProfile(tokenObj.email, { firstname, lastname, address, birth, gender, phone });
        if(!newProfile){
            return res.status(400).send(JsonResponse(400, Message.UPDATE_USER_FAIL, null));
        }

        return res.status(200).send(JsonResponse(200, Message.UPDATE_USER_SUCCESS, null));
    },
    createUser: async (req, res) => {
        const { firstname, lastname, address, gender, birth, phone, email, password, status, role } = req.body;
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

        const newUser = await userService.createUser({ firstname, lastname, address, phone, gender, birth, email, password, status, role });
        if(!newUser){
            return res.status(400).send(JsonResponse(400, Message.CREATE_USER_FAIL, null));
        }

        pusher.trigger("user", "user-add", { newUser });
        return res.status(200).send(JsonResponse(200, Message.CREATE_USER_SUCCESS, newUser));
    },
    updateUser: async (req, res) => {
        const { firstname, lastname, address, phone, email, password, status, role } = req.body;
        const user_id = req.params.id;

        const user = await userService.findOne(user_id);
        if(!user){
            return res.status(400).send(JsonResponse(400, Message.NOT_FOUND_USER, null));
        }
        
        if(phone){
            const isPhone = await userService.checkPhone(phone, user_id);
            if(isPhone > 0){
                return res.status(400).send(JsonResponse(400, Message.PHONE_EXIST, null));
            }
        }

        if(email){
            const isEmail = await userService.checkEmail(email, user_id);
            if(isEmail > 0){
                return res.status(400).send(JsonResponse(400, Message.EMAIL_EXIST, null));
            }
        }
        
        const updateUser = await userService.updateUser(user_id, { firstname, lastname, address, phone, email, password, status, role });
        if(!updateUser){
            return res.status(400).send(JsonResponse(400, Message.UPDATE_USER_FAIL, null));
        }

        pusher.trigger("user", "user-update", { updateUser });
        return res.status(200).send(JsonResponse(200, Message.UPDATE_USER_SUCCESS, true));
    }
}

module.exports = userController;