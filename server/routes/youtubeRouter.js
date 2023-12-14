const Controller = require('../controllers/youtubeController');

const youtubeRouter = require("express").Router()

youtubeRouter.get('/trailers', Controller.getTrailerMovie)
youtubeRouter.get('/reactjs', Controller.getReactJs)
youtubeRouter.get('/details/:id', Controller.videoDetail)
youtubeRouter.get('/channel/:id', Controller.channelDetail)
youtubeRouter.get('/video/:id', Controller.channelVideos)
youtubeRouter.get('/search/:search', Controller.search)


module.exports = youtubeRouter
