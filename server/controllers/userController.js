const { User } = require('../models');
const { signToken } = require('../helpers/jwt');
const { hashPassword, comparePassword } = require('../helpers/bcrypt');

class UserController {

    static async register(req, res, next) {
        try {
            let { username, email, password, phoneNumber, address } = req.body
            let hashedPassword = hashPassword(password)
            const createdUser = await User.create({ username, email, password: hashedPassword, phoneNumber, address })
            res.status(201).json({
                "username": createdUser.username,
                "email": createdUser.email,
                "phoneNumber": createdUser.phoneNumber,
                "address": createdUser.address
            })
        } catch (error) {
            console.log(error.message);
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email) {
                throw {
                    name: "BadRequest",
                    message: 'Email is required'
                }
            }
            if (!password) {
                throw {
                    name: "BadRequest",
                    message: 'Password is required'
                }
            }
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                throw {
                    name: "Unauthorized",
                    message: 'Email wrong'
                }
            }
            const isPasswordCorrect = comparePassword(password, user.password);
            if (!isPasswordCorrect) {
                throw {
                    name: "Unauthorized",
                    message: 'Email or password is required'
                }
            }
            const access_token = signToken({ id: user.id })

            res.status(200).json({ access_token, role: user.role })
        } catch (error) {
            console.log(error.message);   // budget investment
            next(error)
        }
    }
}

module.exports = UserController