require('express-async-errors');
const { Router } = require('express');
const authRoutes = require('./AuthRoutes');
const JsonReponse = require('../../common/reponses/JsonResponse');

const routes = Router();

routes.use('/auth', authRoutes);

routes.use((res) => {
    res.status(500).send(JsonReponse(500, "Có lỗi đã xảy ra!", null));
});

module.exports = routes;