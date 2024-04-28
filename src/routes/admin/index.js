const { Router } = require('express');
const authRoutes = require('./AuthRoutes');

const routes = Router();

routes.use('/auth', authRoutes);


module.exports = routes;