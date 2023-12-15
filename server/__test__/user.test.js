// const request = require("supertest")
// const app = require('../app.js');
// const { signToken } = require("../helpers/jwt");
// const bcryptjs = require("bcryptjs");
// const { sequelize, Favorite, User } = require('../models');
// const request = require('supertest');
// const { queryInterface } = sequelize;

// const userData = {
//     email: 'reza@gmail.com',
//     password: '1234567',
// };

// let access_token


// beforeAll(async () => {
//     const dataUsers = require('../data/users.json')
//         .map((el) => {
//             el.createdAt = el.updatedAt = new Date()
//             el.password = hashPassword(el.password)
//             return el
//         })
//     await queryInterface.bulkInsert('Users', dataUsers, {})
// })
// afterAll(async () => {
//     await queryInterface.bulkDelete('Users', null, {
//         truncate: true,
//         cascade: true,
//         restartIdentity: true
//     })
//     await queryInterface.bulkDelete('Favorites', null, {
//         truncate: true,
//         cascade: true,
//         restartIdentity: true
//     })
// })

// describe('User Routes Test', () => {
//     describe('POST /register - create new user', () => {
//         test('201 Success register - should create new User', (done) => {
//             request(app)
//                 .post('/register')
//                 .send(userData)
//                 .then((response) => {
//                     const { body, status } = response;

//                     expect(status).toBe(201);
//                     expect(body).toHaveProperty('id', expect.any(Number));
//                     expect(body).toHaveProperty('email', userData.email);
//                     done();
//                 })
//                 .catch((err) => {
//                     done(err);
//                 });
//         });
//         test('should be create a new user', async () => {
//             let user = {
//                 username: "user",
//                 email: "stafff@example.com",
//                 password: "password2",
//                 phoneNumber: "123456789",
//                 address: "bandung"
//             }
//             let { status, body } = await request(app)
//                 .post('/users/add-user')
//                 .set('Authorization', `Bearer ${access_token}`)
//                 .send(user)
//             expect(status).toBe(201)
//             expect(body).toEqual({
//                 username: "user",
//                 email: "stafff@example.com",
//                 phoneNumber: "123456789",
//                 address: "bandung"
//             })
//         })
//         test('should fail email is null', async () => {
//             let user = {
//                 username: "user",
//                 password: "password2",
//                 phoneNumber: "123456789",
//                 address: "bandung"
//             }
//             let { status, body } = await request(app)
//                 .post('/users/add-user')
//                 .set('Authorization', `Bearer ${access_token}`)
//                 .send(user)
//             expect(status).toBe(400)
//             expect(body).toEqual({
//                 message: body.message
//             })
//         })
//         test('should fail password is null', async () => {
//             let user = {
//                 username: "user",
//                 email: "stafff@example.com",
//                 phoneNumber: "123456789",
//                 address: "bandung"
//             }
//             let { status, body } = await request(app)
//                 .post('/users/add-user')
//                 .set('Authorization', `Bearer ${access_token}`)
//                 .send(user)
//             expect(status).toBe(400)
//             expect(body).toEqual({
//                 message: "Password is required"
//             })
//         })
//         test('should fail email is empty string', async () => {
//             let user = {
//                 username: "user",
//                 email: "",
//                 password: "password2",
//                 phoneNumber: "123456789",
//                 address: "bandung"
//             }
//             let { status, body } = await request(app)
//                 .post('/users/add-user')
//                 .set('Authorization', `Bearer ${access_token}`)
//                 .send(user)
        
//             expect(status).toBe(400)
//             expect(body).toEqual({
//                 message: "Email is required"
//             })
//         })
//         test('should fail password is empty string', async () => {
//             let user = {
//                 username: "user",
//                 email: "stafff@example.com",
//                 password: "",
//                 phoneNumber: "123456789",
//                 address: "bandung"
//             }
//             let { status, body } = await request(app)
//                 .post('/users/add-user')
//                 .set('Authorization', `Bearer ${access_token}`)
//                 .send(user)
        
//             expect(status).toBe(400)
//             expect(body).toEqual({
//                 message: "Password is required"
//             })
//         })
//         test('email is registered', async () => {
//             let user = {
//                 username: "user",
//                 email: "user1@example.com",
//                 password: "password1",
//                 phoneNumber: "123456789",
//                 address: "bandung"
//             }
//             let { status, body } = await request(app)
//                 .post('/users/add-user')
//                 .set('Authorization', `Bearer ${access_token}`)
//                 .send(user)
        
//             expect(status).toBe(400)
//             expect(body).toEqual({
//                 message: "Email is already used"
//             })
//         })
//         test('formated email wrong', async () => {
//             let user = {
//                 username: "user",
//                 email: "user1.com",
//                 password: "password1",
//                 phoneNumber: "123456789",
//                 address: "bandung"
//             }
//             let { status, body } = await request(app)
//                 .post('/users/add-user')
//                 .send(user)
//                 .set('Authorization', `Bearer ${access_token}`)
        
//             expect(status).toBe(400)
//             expect(body).toEqual({
//                     message: 'Invalid email format'
//             })
//         })
//         test('add user fail because acces token is not empty', async () => {
//             let user = {
//                 username: "user",
//                 email: "user1@ymail.com",
//                 password: "password1",
//                 phoneNumber: "123456789",
//                 address: "bandung"
//             }
//             let { status, body } = await request(app)
//                 .post('/users/add-user')
//                 .send(user)
        
//             expect(status).toBe(401)
//             expect(body).toEqual({
//                     message: 'Invalid token'
//             })
//         })
//         test('add user fail because invalid token', async () => {
//             let user = {
//                 username: "user",
//                 email: "user1@ymail.com",
//                 password: "password1",
//                 phoneNumber: "123456789",
//                 address: "bandung"
//             }
//             let { status, body } = await request(app)
//             .post('/users/add-user')
//             .set('Authorization', `Bearer ,mjnhjgkgkjvkgkvbm,`)
//             .send(user)
//             expect(status).toBe(401)
//             expect(body).toEqual({
//                     message: 'Invalid token'
//             })
//         })

//     });

//     describe('POST /login - user login', () => {
//         test("success login", async () => {
//             const user = {
//                 email: "user1@example.com",
//                 password: "password1"
//             }
//             const response = await request(app)
//                 .post('/users/login')
//                 .send(user)
//             expect(response.status).toBe(200);
//             expect(response.body).toHaveProperty("access_token");
//         })
//     });

//     test("Email is null", async () => {
//         const user = {
//             password: "password1",
//         }
//         const response = await request(app)
//             .post('/users/login')
//             .send(user)
//         expect(response.status).toBe(400);
//         expect(response.body).toEqual({
//             message: "Email is required"
//         })
//     })
    
//     test("Password is null", async () => {
//         const user = {
//             email: "user1@example.com",
//         }
//         const response = await request(app)
//             .post('/users/login')
//             .send(user)
//         expect(response.status).toBe(400);
//         expect(response.body).toEqual({
//             message: "Password is required"
//         })
//     })
    
//     test("Email provided is invalid", async () => {
//         const user = {
//             email: "user12@example.com",
//             password: "password1"
//         }
//         const response = await request(app)
//             .post('/users/login')
//             .send(user)
//         expect(response.status).toBe(401);
//         expect(response.body).toEqual({
//             message: "Unauthorized"
//         })
//     })
    
//     test("Password is Wrong", async () => {
//         const user = {
//             email: "user1@example.com",
//             password: "password12"
//         }
//         const response = await request(app)
//             .post('/users/login')
//             .send(user)
//         expect(response.status).toBe(401);
//         expect(response.body).toEqual({
//             message: "Unauthorized"
//         })
//     })
// });