const { Router } = require("express");
const categoryController = require("../../controllers/CateogoryController");
const authenticate = require("../../common/securities/middleware");

const categoryRoutes = Router();

categoryRoutes.get("/", categoryController.findCategories);
categoryRoutes.get("/page", categoryController.findCategoriesPage);
categoryRoutes.post("/", [authenticate.authenticateToken, authenticate.permission(['admin'])], categoryController.createCategory);
categoryRoutes.delete("/:id", [authenticate.authenticateToken, authenticate.permission(['admin'])], categoryController.deleteCategory);
categoryRoutes.put("/:id", [authenticate.authenticateToken, authenticate.permission(['admin'])], categoryController.updateCategory);

module.exports = categoryRoutes;