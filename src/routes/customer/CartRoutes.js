const { Router } = require("express");
const cartController = require("../../controllers/CartController");


const cartRoutes = Router();

cartRoutes.get("/", cartController.findCartByCustomer);
cartRoutes.post("/", cartController.addItem);
cartRoutes.delete("/:id", cartController.deleteItem);
cartRoutes.put("/:id", cartController.changeQuantity);
cartRoutes.post("/payment", cartController.payOrder);

module.exports = cartRoutes;