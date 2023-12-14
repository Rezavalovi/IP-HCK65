const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models')
module.exports = async function authenticate(req, res, next) {
    try {
        let token = req.headers.authorization

        console.log(token, "token");
        if (!token) {
            throw { name: 'Invalid token' }
        }

        if (token.slice(0, 7) !== 'Bearer ') {
            throw { name: 'Invalid token' }
        }

        token = token.slice(7)
        let payload = verifyToken(token)
        let user = await User.findByPk(payload.id)
        if (!user) {
            throw { name: "InvalidToken" }
        }
        req.user = {
            id: user.id,
        }
        next()
    } catch (error) {
        console.log(error);
    }
}