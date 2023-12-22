const favoriteController = require('../controllers/favoriteController');
const authentication = require('../middlewares/authentication');


const favoriteRouter = require('express').Router();

favoriteRouter.get("/", authentication, favoriteController.getAll);
favoriteRouter.post("/", authentication, favoriteController.addFavorite);
favoriteRouter.get("/UserId/:id", authentication, favoriteController.getAllByUserid);
favoriteRouter.delete("/:id", favoriteController.deleteFavorite);
// favoriteRouter.put("/:id", favoriteController.updateFavorite);


module.exports = favoriteRouter