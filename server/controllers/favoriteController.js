const { Favorite } = require("../models");


class FavoriteController {
    static async getAll(req, res, next) {
        try {
            const data = await Favorite.getAll()

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getAllByUserid(req, res, next) {
        try {
            const { id } = req.params
            const data = await Favorite.findAll({
                where: {
                    UserId: id
                }
            })

            res.status(200).json(data)
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }

    static async addFavorite(req, res, next) {
        try {
            console.log("masuk")
            const { avatarUrl, type, canonicalBaseUrl, channelId, titleChannel, description, thumbnailUrl, views, videoId, titleVideo } = req.body

            let body =
                { avatarUrl, type, canonicalBaseUrl, channelId, titleChannel, description, thumbnailUrl, views, videoId, titleVideo, UserId: req.user.id }
            const createdFavorite = await Favorite.create(body)
            res.status(200).json({
                message: "Favorite added",
                data: createdFavorite
            })
        } catch (error) {
            next(error);
        }
    }

    static async deleteFavorite(req, res, next) {
        try {
            const { id } = req.params
            // await Favorite.findByPk(id)
            await Favorite.destroy({
                where: {
                    id: id
                }
            })
            res.status(200).json({
                message: "Favorite deleted",
            })
        } catch (error) {
            next(error);
        }
    }

    // static async updateFavorite(req, res, next) {
    //     try {

    //     } catch (error) {
    //         console.log(error.message);
    //         next(error);
    //     }
    // }

}

module.exports = FavoriteController;