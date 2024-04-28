const { Router } = require("express");
const authController = require("../../controllers/AuthController");

const authRoutes = Router();

authRoutes.post("/login", authController.loginStaff);

module.exports = authRoutes;