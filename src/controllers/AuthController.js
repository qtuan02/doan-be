const Message = require("../common/messages/ConstantMessage");
const JsonReponse = require("../common/reponses/JsonResponse");
const jwtFitler = require("../common/securities/jwt");
const staffService = require("../services/StaffService");


const authController = {
    loginStaff: async (req, res) => {
        const { account, password } = req.body;
        if(!account || !password){
            return res.status(400).send(JsonReponse(400, Message.FILED_EMPTY, null));
        }

        const staff = await staffService.findByPhoneOrEmail(account);
        if(!staff){
            return res.status(400).send(JsonReponse(400, Message.NOT_FOUND_STAFF, null));
        }

        const checkPassword = await staffService.checkPassword(password, staff.password);
        if(!checkPassword){
            return res.status(400).send(JsonReponse(400, Message.WRONG_PASSWORD, null));
        }

        return res.status(200).send(JsonReponse(200, Message.LOGIN_SUCCESS, { "token": jwtFitler.signJwt(staff.email, staff.role.role_name)}));
    }
}

module.exports = authController;