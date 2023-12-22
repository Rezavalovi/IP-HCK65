const request = require("supertest")
const app = require('../app.js');
const { signToken } = require("../helpers/jwt.js");
const bcryptjs = require("bcryptjs");
const { sequelize, Favorite, User } = require('../models/index.js');
const { hashPassword } = require("../helpers/bcrypt.js");
const { queryInterface } = sequelize;

beforeAll(async () => {
    const dataUsers = require('../data/users.json')
        .map((el) => {
            el.createdAt = el.updatedAt = new Date()
            el.password = hashPassword(el.password)
            return el
        })

    await queryInterface.bulkInsert('Users', dataUsers)
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})

describe('User Routes Test', () => {
    describe('POST /register - create new user', () => {
        test('should be create a new user', async () => {
            let user = {
                username: "user",
                email: "stafff@example.com",
                password: "password2",
                phoneNumber: "123456789",
                address: "bandung"
            }
            let { status, body } = await request(app)
                .post('/users/register')
                .send(user)
            expect(status).toBe(201)
            expect(body).toHaveProperty('username', expect.any(String));
            expect(body).toHaveProperty('email', user.email);
            expect(body).toHaveProperty('phoneNumber', user.phoneNumber);
            expect(body).toHaveProperty('address', user.address);
        })
        test('should fail email is null', async () => {
            let user = {
                username: "user",
                password: "password2",
                phoneNumber: "123456789",
                address: "bandung"
            }
            let { status, body } = await request(app)
                .post('/users/register')
                .send(user)
            expect(status).toBe(400)
            expect(body).toHaveProperty("message")
        })
        test('should fail password is null', async () => { //
            let user = {
                username: "user",
                email: "stafff@example.com",
                phoneNumber: "123456789",
                address: "bandung"
            }
            let { status, body } = await request(app)
                .post('/users/register')
                .send(user)
            expect(status).toBe(400)
            expect(body).toHaveProperty("message")
        })
        test('should fail email is empty string', async () => {
            let user = {
                username: "user",
                email: "",
                password: "password2",
                phoneNumber: "123456789",
                address: "bandung"
            }
            let { status, body } = await request(app)
                .post('/users/register')
                .send(user)
            expect(status).toBe(400)
            expect(body).toHaveProperty("message")

        })
        test('should fail password is empty string', async () => {
            let user = {
                username: "user",
                email: "stafff@example.com",
                password: "",
                phoneNumber: "123456789",
                address: "bandung"
            }
            let { status, body } = await request(app)
                .post('/users/register')
                .send(user)
            expect(status).toBe(400)
            expect(body).toHaveProperty("message")

        })
        test('formated email wrong', async () => {
            let user = {
                username: "user",
                email: "user1.com",
                password: "password1",
                phoneNumber: "123456789",
                address: "bandung"
            }
            let { status, body } = await request(app)
                .post('/users/register')
                .send(user)
            expect(status).toBe(400)
            expect(body).toHaveProperty("message")
        })
    });

    describe('POST /login - user login', () => {
        test("success login", async () => {
            const user = {
                email: "reza@gmail.com",
                password: "1234567"
            }
            let { status, body } = await request(app)
                .post('/users/login')
                .send(user)
            expect(status).toBe(200);
            expect(body).toHaveProperty("access_token");
        })

        test("Email is null", async () => {
            const user = {
                password: "password1",
            }
            let { status, body } = await request(app)
                .post('/users/login')
                .send(user)
            expect(status).toBe(400);
            expect(body).toHaveProperty("message")
        })

        test("Password is null", async () => {
            const user = {
                email: "user1@example.com",
            }
            let { status, body } = await request(app)
                .post('/users/login')
                .send(user)
            expect(status).toBe(400);
            expect(body).toHaveProperty("message")
        })

        test("Email provided is invalid", async () => {
            const user = {
                email: "user12@example.com",
                password: "password1"
            }
            let { status, body } = await request(app)
                .post('/users/login')
                .send(user)
            expect(status).toBe(401);
            expect(body).toHaveProperty("message")
        })

        test("Password is Wrong", async () => {
            const user = {
                email: "user1@example.com",
                password: "password12"
            }
            let { status, body } = await request(app)
                .post('/users/login')
                .send(user)
            expect(status).toBe(401);
            expect(body).toHaveProperty("message")
        })
    });

    describe('GET /users', () => {
        test('GET user info', async () => {
            let { status, body } = await request(app)
                .get('/users')
            expect(status).toBe(200)
        })
    })


})

// describe('POST /goggle-login - user login', () => {
//     test("success login", async () => {
//         const user = {
//             email: "rezavalovi98@gmail.com",
//         }
//         const response = await request(app)
//             .post('/users/goggle-login')
//             .send(user)
//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty("google_token");
//     })
// })
