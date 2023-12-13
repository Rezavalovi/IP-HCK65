const user = require("./userRouter")
const youtube = require("./youtubeRouter")

const router = require("express").Router()

router.use("/users", user)
router.use("/", youtube)

module.exports = router
