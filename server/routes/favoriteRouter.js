const favoriteController = require('../controllers/favoriteController');
const authentication = require('../middlewares/authentication');


const favoriteRouter = require('express').Router();

favoriteRouter.get("/", authentication, favoriteController.getAll);
favoriteRouter.get("/UserId/:id", authentication, favoriteController.getAllByUserid);
favoriteRouter.post("/", authentication, favoriteController.addFavorite);
favoriteRouter.delete("/:id", favoriteController.deleteFavorite);
// favoriteRouter.put("/updateFavorite", favoriteController.updateFavorite);


module.exports = favoriteRouter