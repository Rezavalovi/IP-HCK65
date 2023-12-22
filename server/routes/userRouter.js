const userController = require('../controllers/userController');

const userRouter = require("express").Router()

userRouter.post("/register", userController.register)
userRouter.post("/login", userController.login)
userRouter.post("/google-login", userController.googleLogin)
userRouter.get("/", userController.getUserInfo)
userRouter.get("/:id", userController.getUserInfo)


module.exports = userRouter
