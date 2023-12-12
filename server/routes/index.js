const user = require("./userRouter")

const router = require("express").Router()

router.use("/users", user)

module.exports = router
