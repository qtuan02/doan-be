const { Router } = require("express");
const authenticate = require("../common/securities/middleware");
const bannerController = require("../controllers/BannerController");
const bannerRoutes = Router();

bannerRoutes.get("/", [authenticate.authenticateToken, authenticate.permission(['admin', 'staff'])], bannerController.findAll);
bannerRoutes.post("/", [authenticate.authenticateToken, authenticate.permission(['admin', 'staff'])], bannerController.createBanner);
bannerRoutes.delete("/:id", [authenticate.authenticateToken, authenticate.permission(['admin', 'staff'])], bannerController.deleteBanner);

module.exports = bannerRoutes;