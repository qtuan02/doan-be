require('express-async-errors');
const { Router } = require('express');
const authRoutes = require('./AuthRoutes');
const productRoutes = require('./ProductRoutes');
const categoryRoutes = require('./CategoryRoutes');
const JsonReponse = require('../../common/reponses/JsonResponse');

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/product', productRoutes);
routes.use('/category', categoryRoutes);

routes.use((err, req, res, next) => {
    res.status(500).send(JsonReponse(500, "Có lỗi đã xảy ra!", null));
});

module.exports = routes;