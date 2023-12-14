const favorite = require("./favoriteRouter")
const user = require("./userRouter")
const youtube = require("./youtubeRouter")

const router = require("express").Router()

router.use("/users", user)
router.use("/youtube", youtube)
router.use("/favorite", favorite)

module.exports = router
