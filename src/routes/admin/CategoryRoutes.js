const { Router } = require("express");
const categoryController = require("../../controllers/CateogoryController");

const categoryRoutes = Router();

categoryRoutes.get("/", categoryController.findCategories);
categoryRoutes.post("/", categoryController.createCategory);
categoryRoutes.delete("/:id", categoryController.deleteCategory);
categoryRoutes.put("/:id", categoryController.updateCategory);

module.exports = categoryRoutes;