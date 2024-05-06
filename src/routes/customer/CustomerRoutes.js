const { Router } = require("express");
const customerController = require("../../controllers/CustomerController");

const customerRoutes = Router();

customerRoutes.get("/", customerController.findInfo);
customerRoutes.post("/register", customerController.register);
customerRoutes.post("/login", customerController.loginCustomer);
customerRoutes.post("/changePassword", customerController.changePassword);
customerRoutes.put("/", customerController.updateCustomer);

module.exports = customerRoutes;