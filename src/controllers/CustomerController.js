const Message = require("../common/messages/ConstantMessage");
const JsonReponse = require("../common/reponses/JsonResponse");
const customerService = require("../services/CustomerService");
const jwtFitler = require("../common/securities/jwt");
const { omit } = require("lodash");

const customerController = {
    findInfo: async (req, res) => {
        const tokenObj = await jwtFitler.verifyJwt(jwtFitler.getTokenFromHeader(req));
        if(!tokenObj){
            return res.status(400).send(JsonReponse(400, Message.TOKEN_EXPIRED, null));
        }

        const customer = await customerService.findByEmail(tokenObj.email);
        if(!customer){
            return res.status(400).send(JsonReponse(400, Message.NOT_FOUND_CUSTOMER, null));
        }
        
        return res.status(200).send(JsonReponse(200, Message.FOUND_CUSTOMER_SUCCESS, omit(customer.toJSON(), 'password')));
    },
    register: async (req, res) => {
        const { customer_firstname, customer_lastname, phone, email, password } = req.body;
        if(!customer_firstname || !customer_lastname || !phone || !email || !password){
            return res.status(400).send(JsonReponse(400, Message.FILED_EMPTY, null));
        }

        const isEmail = await customerService.findByEmail(email);
        if(isEmail){
            return res.status(400).send(JsonReponse(400, Message.EMAIL_EXIST, null));
        }

        const isPhone = await customerService.findByPhone(phone);
        if(isPhone){
            return res.status(400).send(JsonReponse(400, Message.PHONE_EXIST, null));
        }

        const newCustomer = await customerService.createCustomer({ customer_firstname, customer_lastname, phone, email, password });
        if(!newCustomer){
            return res.status(400).send(JsonReponse(400, Message.CREATE_CUSTOMER_FAIL, null));
        }

        return res.status(200).send(JsonReponse(200, Message.CREATE_CUSTOMER_SUCCESS, newCustomer));
    },
    loginCustomer: async (req, res) => {
        const { account, password } = req.body;
        if(!account || !password){
            return res.status(400).send(JsonReponse(400, Message.FILED_EMPTY, null));
        }

        const customer = await customerService.findByPhoneOrEmail(account);
        if(!customer){
            return res.status(400).send(JsonReponse(400, Message.NOT_FOUND_CUSTOMER, null));
        }

        const checkPassword = await customerService.checkPassword(password, customer.password);
        if(!checkPassword){
            return res.status(400).send(JsonReponse(400, Message.WRONG_PASSWORD, null));
        }

        return res.status(200).send(JsonReponse(200, Message.LOGIN_SUCCESS, { "token": jwtFitler.signJwt(customer.email, "customer")}));
    },
    changePassword: async (req, res) => {
        const tokenObj = await jwtFitler.verifyJwt(jwtFitler.getTokenFromHeader(req));
        if(!tokenObj){
            return res.status(400).send(JsonReponse(400, Message.TOKEN_EXPIRED, null));
        }

        const customer = await customerService.findByEmail(tokenObj.email);
        const { password, oldPassword } = req.body;

        if(!password || !oldPassword){
            return res.status(400).send(JsonReponse(400, Message.FILED_EMPTY, null));
        }

        const checkPassword = await customerService.checkPassword(oldPassword, customer.password);
        if(!checkPassword){
            return res.status(400).send(JsonReponse(400, Message.WRONG_PASSWORD, null));
        }

        const changePassword = await customerService.changePassword(customer.email, password );
        if(!changePassword){
            return res.status(400).send(JsonReponse(400, Message.CHANGE_PASSWORD_FAIL, null));
        }

        return res.status(200).send(JsonReponse(200, Message.CHANGE_PASSWORD_SUCCESS, changePassword));
    },
    updateCustomer: async (req, res) => {
        const tokenObj = await jwtFitler.verifyJwt(jwtFitler.getTokenFromHeader(req));
        if(!tokenObj){
            return res.status(400).send(JsonReponse(400, Message.TOKEN_EXPIRED, null));
        }

        const { customer_firstname, customer_lastname, address, birth, gender } = req.body;
        
        const newCustomer = await customerService.updateCustomer(tokenObj.email, { customer_firstname, customer_lastname, address, birth, gender });
        if(!newCustomer){
            return res.status(400).send(JsonReponse(400, Message.UPDATE_CUSTOMER_FAIL, null));
        }

        return res.status(200).send(JsonReponse(200, Message.UPDATE_CUSTOMER_SUCCESS, newCustomer));
    }
}

module.exports = customerController;