const { Router } = require("express");
const productController = require("../../controllers/ProductContorller");
const authenticate = require("../../common/securities/middleware");

const productRoutes = Router();

productRoutes.get("/", productController.findProducts);
productRoutes.post("/", [authenticate.authenticateToken, authenticate.permission(['admin'])], productController.createProduct);
productRoutes.delete("/:id", [authenticate.authenticateToken, authenticate.permission(['admin'])], productController.deleteProduct);
productRoutes.put("/:id", [authenticate.authenticateToken, authenticate.permission(['admin'])], productController.updateProduct);

module.exports = productRoutes;