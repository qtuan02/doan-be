const { Router } = require("express");
const orderController = require("../../controllers/OrderController");
const authenticate = require("../../common/securities/middleware");


const orderRoutes = Router();

orderRoutes.get("/", [authenticate.authenticateToken, authenticate.permission(['admin'])], orderController.findAll);
orderRoutes.put("/:id", [authenticate.authenticateToken, authenticate.permission(['admin'])], orderController.updateOrder);

module.exports = orderRoutes;