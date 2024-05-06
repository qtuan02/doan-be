const jwtFitler = require("./jwt");
const Message = require("../messages/ConstantMessage");
const JsonReponse = require("../reponses/JsonResponse");


const authenticate = {
    authenticateToken: (req, res, next) => {
        const token = jwtFitler.getTokenFromHeader(req);
        if(!token){
            return res.status(401).send(JsonReponse(401, Message.UNAUTHORIZED, null));
        }
    
        const decoded = jwtFitler.verifyJwt(token);
        if(!decoded){
            return res.status(400).send(JsonReponse(400, Message.TOKEN_EXPIRED, null));
        }
    
        req.role = decoded.role;
        next();
    },
    permission: (roles) => {
        return (req, res, next) => {
            const role = req.role;
            if(!roles.includes(role)){
                return res.status(401).send(JsonReponse(401, Message.UNAUTHORIZED, null));
            }
            next();
        }
    }
}

module.exports = authenticate;