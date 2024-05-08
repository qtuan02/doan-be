const rateLimit = require('express-rate-limit');
const JsonReponse = require('../reponses/JsonResponse');

const limiter = rateLimit({
	windowMs: 1 * 1000, //1 giây
	limit: 10, //10 request
	standardHeaders: true,
    legacyHeaders: false,
	message: JsonReponse(429, "Quá nhiều yêu cầu để xử lý!", null)
})


module.exports = limiter;
