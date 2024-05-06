const { Router } = require("express");
const brandController = require("../../controllers/BrandController");
const authenticate = require("../../common/securities/middleware");


const brandRoutes = Router();

brandRoutes.get("/", brandController.findBrands);
brandRoutes.post("/", [authenticate.authenticateToken, authenticate.permission(['admin'])], brandController.createBrand);
brandRoutes.delete("/:id", [authenticate.authenticateToken, authenticate.permission(['admin'])], brandController.deleteBrand);
brandRoutes.put("/:id", [authenticate.authenticateToken, authenticate.permission(['admin'])], brandController.updateBrand);

module.exports = brandRoutes;