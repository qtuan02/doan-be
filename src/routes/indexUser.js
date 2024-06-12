require('express-async-errors');
const { Router } = require('express');
const { userRoutesUser } = require("./UserRoutes");
const JsonReponse = require('../common/reponses/JsonResponse');
const cartRoutes = require('./CartRoutes');
const { orderRoutesCustomer } = require('./OrderRoutes');
const favoriteRoutes = require('./FavoriteRoutes');

const routes = Router();

routes.use('/user', userRoutesUser);
routes.use('/cart', cartRoutes);
routes.use('/order', orderRoutesCustomer);
routes.use('/favorite', favoriteRoutes);

routes.use((err, req, res, next) => {
    res.status(500).send(JsonReponse(500, "Có lỗi đã xảy ra!", null));
});

module.exports = routes;