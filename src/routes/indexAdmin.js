require('express-async-errors');
const { Router } = require('express');
const uploadRoutes = require('./UploadRoutes');
const { userRoutesAdmin } = require("./UserRoutes");
const JsonReponse = require('../common/reponses/JsonResponse');
const categoryRoutes = require('./CategoryRoutes');
const brandRoutes = require('./BrandRoutes');
const productRoutes = require('./ProductRoutes');
const { orderRoutesAdmin } = require('./OrderRoutes');
const dashboardRoutes = require('./DashboardRoutes');
const bannerRoutes = require('./BannerRoutes');

const routes = Router();

routes.use('/banner', bannerRoutes);
routes.use('/dashboard', dashboardRoutes);
routes.use('/upload', uploadRoutes);
routes.use('/user', userRoutesAdmin);
routes.use('/category', categoryRoutes);
routes.use('/brand', brandRoutes);
routes.use('/product', productRoutes);
routes.use('/order', orderRoutesAdmin);

routes.use((err, req, res, next) => {
    res.status(500).send(JsonReponse(500, "Có lỗi đã xảy ra!", null));
});

module.exports = routes;