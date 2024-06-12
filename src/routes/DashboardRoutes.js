const { Router } = require("express");
const authenticate = require("../common/securities/middleware");
const dashboardController = require("../controllers/DashboardController");

const dashboardRoutes = Router();

dashboardRoutes.get("/", [authenticate.authenticateToken, authenticate.permission(['admin', 'staff'])], dashboardController.count);

module.exports = dashboardRoutes;