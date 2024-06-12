const { Router } = require("express");
const cartController = require("../controllers/CartController");

const cartRoutes = Router();

cartRoutes.get("/", cartController.findCartByCustomer);
cartRoutes.post("/", cartController.addItem);
cartRoutes.delete("/:id", cartController.deleteItem);
cartRoutes.put("/:id", cartController.changeQuantity);

module.exports = cartRoutes;