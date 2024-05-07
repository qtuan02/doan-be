const rateLimit = require('express-rate-limit');
const JsonReponse = require('../reponses/JsonResponse');

const limiter = rateLimit({
	windowMs: 60 * 1000, // 5 giây
	limit: 10, // 5 yêu cầu
	standardHeaders: true,
    legacyHeaders: false,
	message: JsonReponse(429, "Quá nhiều yêu cầu trong 5 giây!", null)
})


module.exports = limiter;
