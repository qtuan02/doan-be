const { Router } = require("express");
const orderController = require("../../controllers/OrderController");
const authenticate = require("../../common/securities/middleware");


const orderRoutes = Router();

orderRoutes.get("/", [authenticate.authenticateToken, authenticate.permission(['admin'])], orderController.findAll);

module.exports = orderRoutes;