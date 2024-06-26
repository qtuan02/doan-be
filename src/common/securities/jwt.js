const jwt = require('jsonwebtoken');
const appConfig = require('../../configs/env.config');

const jwtFitler = {
    signJwt: (email, role) => {
        return jwt.sign({email, role}, appConfig.JWT_PRIVATE_KEY, {
            algorithm: "HS256",
            expiresIn: "1w"
        })
    },
    verifyJwt: (token) => {
        try{
            const decoded = jwt.verify(token, appConfig.JWT_PRIVATE_KEY);
            return decoded;
        }catch(err){
            return null;
        }
    },
    getTokenFromHeader: (req) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        return token;
    }
}

module.exports = jwtFitler;