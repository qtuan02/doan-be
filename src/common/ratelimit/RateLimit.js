const rateLimit = require('express-rate-limit');
const JsonReponse = require('../reponses/JsonResponse');

const limiter = rateLimit({
	windowMs: 5 * 1000, // 5 giây
	limit: 5, // 5 yêu cầu
	standardHeaders: true,
    legacyHeaders: false,
	message: JsonReponse(429, "Quá nhiều yêu cầu trong 5 giây!", null)
})


module.exports = limiter;
