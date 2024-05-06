require('express-async-errors');
const { Router } = require('express');
const customerRoutes = require('./CustomerRoutes');
const JsonReponse = require('../../common/reponses/JsonResponse');
const cartRoutes = require('./CartRoutes');

const routes = Router();

routes.use('/customer', customerRoutes);
routes.use('/cart', cartRoutes);

routes.use((err, req, res, next) => {
    res.status(500).send(JsonReponse(500, "Có lỗi đã xảy ra!", null));
});

module.exports = routes;