const { Router } = require("express");
const favoriteControler = require("../controllers/FavoriteController");

const favoriteRoutes = Router();

favoriteRoutes.get("/", favoriteControler.findByUser);
favoriteRoutes.post("/", favoriteControler.addFavorite);
favoriteRoutes.delete("/:id", favoriteControler.deleteByUser);

module.exports = favoriteRoutes;