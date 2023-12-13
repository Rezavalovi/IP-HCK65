const userController = require('../controllers/userController');

const userRouter = require("express").Router()

userRouter.post("/register", userController.register)
userRouter.post("/login", userController.login)
userRouter.post("/google-login", userController.googleLogin)

module.exports = userRouter
