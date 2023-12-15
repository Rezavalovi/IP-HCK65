const { User } = require('../models');
const { signToken } = require('../helpers/jwt');
const { hashPassword, comparePassword } = require('../helpers/bcrypt');
const nodemailer = require("nodemailer");

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client

class UserController {

    static async register(req, res, next) {
        try {
            let { username, email, password, phoneNumber, address } = req.body
            let hashedPassword = hashPassword(password)
            const createdUser = await User.create({ username, email, password: hashedPassword, phoneNumber, address })
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "rezavalovi98@gmail.com",
                    pass: process.env.PASSWORD_EMAIL,
                },
            });

            async function main() {
                // send mail with defined transport object
                const info = await transporter.sendMail({
                    from: '"Reza Valovi" <foo@example.com>', // sender address
                    to: createdUser.email, // list of receivers
                    subject: "Hello ✔", // Subject line
                    text: "You are succes registed", // plain text body
                    html: "<b>You are succes registed</b>", // html body
                });
                console.log("Message sent: %s", info.messageId);
            }
            main().catch(console.error);

            res.status(201).json({
                "username": createdUser.username,
                "email": createdUser.email,
                "phoneNumber": createdUser.phoneNumber,
                "address": createdUser.address
            })
        } catch (error) {
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

            res.status(200).json({ access_token, id: user.id })
        } catch (error) {
            console.log(error.message);
            next(error)
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const { google_token } = req.body

            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            const payload = ticket.getPayload()

            const [user, created] = await User.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    password: Math.random().toString(),
                    phoneNumber: payload.phoneNumber,
                    address: payload.address
                }
            })

            const access_token = signToken({ id: user.id })

            res.status(created ? 201 : 200).json({
                "message": `User ${user.email} found`,
                "access_token": access_token,
                "id": user.id
            })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController