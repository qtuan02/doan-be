const { Router } = require("express");
const productController = require("../controllers/ProductContorller");
const authenticate = require("../common/securities/middleware");

const productRoutes = Router();

productRoutes.get("/", productController.findProducts);
productRoutes.get("/:id", productController.findOne);
productRoutes.post("/", [authenticate.authenticateToken, authenticate.permission(['admin'])], productController.createProduct);
productRoutes.delete("/:id", [authenticate.authenticateToken, authenticate.permission(['admin'])], productController.deleteProduct);
productRoutes.put("/:id", [authenticate.authenticateToken, authenticate.permission(['admin'])], productController.updateProduct);

productRoutes.delete("/image/:id", [authenticate.authenticateToken, authenticate.permission(['admin'])], productController.deleteImageDescription);
productRoutes.put("/image/:id", [authenticate.authenticateToken, authenticate.permission(['admin'])], productController.updateImageDescription);

module.exports = productRoutes;