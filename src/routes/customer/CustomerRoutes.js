const { Router } = require("express");
const customerController = require("../../controllers/CustomerController");
const authenticate = require("../../common/securities/middleware");

const customerRoutes = Router();

customerRoutes.get("/all", [authenticate.authenticateToken, authenticate.permission(['admin'])], customerController.findCustomers);
customerRoutes.get("/", customerController.findInfo);
customerRoutes.post("/register", customerController.register);
customerRoutes.post("/login", customerController.loginCustomer);
customerRoutes.post("/changePassword", customerController.changePassword);
customerRoutes.put("/", customerController.updateCustomer);

module.exports = customerRoutes;