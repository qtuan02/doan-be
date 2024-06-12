const { Router } = require("express");
const authenticate = require("../common/securities/middleware");
const orderController = require("../controllers/OrderController");

const orderRoutesAdmin = Router();
const orderRoutesCustomer = Router();

orderRoutesAdmin.get("/", [authenticate.authenticateToken, authenticate.permission(['admin', 'staff'])], orderController.findAll);
orderRoutesAdmin.get("/:id", [authenticate.authenticateToken, authenticate.permission(['admin', 'staff'])], orderController.findOrderDetail);
orderRoutesAdmin.put("/:id", [authenticate.authenticateToken, authenticate.permission(['admin'])], orderController.updateStatusOrder);

orderRoutesCustomer.get("/history", orderController.findOrderByCustomer);
orderRoutesCustomer.get("/history/:id", orderController.findOrderDetailByCustomer);
orderRoutesCustomer.post("/payment", orderController.paymentOfCart);
orderRoutesCustomer.post("/pay", orderController.paymentOfAnonymous);

module.exports = {
    orderRoutesAdmin,
    orderRoutesCustomer
};