const { Router } = require("express");
const brandController = require("../../controllers/BrandController");


const brandRoutes = Router();

brandRoutes.get("/", brandController.findBrands);
brandRoutes.post("/", brandController.createBrand);
brandRoutes.delete("/:id", brandController.deleteBrand);
brandRoutes.put("/:id", brandController.updateBrand);

module.exports = brandRoutes;