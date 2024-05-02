const { Router } = require("express");
const productController = require("../../controllers/ProductContorller");

const productRoutes = Router();

productRoutes.get("/", productController.findProducts);
productRoutes.post("/", productController.createProduct);
productRoutes.delete("/:id", productController.deleteProduct);
productRoutes.put("/:id", productController.updateProduct);

module.exports = productRoutes;