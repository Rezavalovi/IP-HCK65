const app = require("../app");
const { signToken } = require("../helpers/jwt");
const request = require("supertest");

const { sequelize, User, Favorite } = require("../models");
const { queryInterface } = sequelize

let favoriteId
let token;
beforeAll(async () => {

    let user = {
        username: "rezavalovi",
        email: "reza@gmail.com",
        password: "1234567",
        phoneNumber: "081226411232",
        address: "123 Main Street"
    }
    let newUser = await User.create(user)

    let favorite = {
        avatarUrl: "https://yt3.ggpht.com/ytc/AIf8zZRk7wPdrke93AYdRm7XrsKiBYWM-0RnH_m6s0EHSw=s48-c-k-c0x00ffffff-no-rj",
        type: "video",
        canonicalBaseUrl: "https://youtube.com/watch",
        channelId: "UCuPivVjnfNo4mb3Oog_frZg",
        titleChannel: "A24",
        description: "RELEASE DATE: April 26, 2024 DIRECTOR: Alex Garland CAST: Kirsten Dunst, Wagner Moura, Stephen McKinley Henderson, and Cailee Spaeny....",
        thumbnailUrl: "http://https://i.ytimg.com/vi/aDyQxtg0V2w/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDXCAW57VRLXdLVYaNTQgll49hunA",
        views: "2220991",
        videoId: "aDyQxtg0V2w",
        titleVideo: "Civil War | Official Trailer HD | A24",
    }

    await Favorite.create(favorite)
    let id = await Favorite.findByPk(1)
    favoriteId = id

    token = signToken({ id: newUser.id })

});

describe("Favorite Routes Tests", () => {
    describe('GET /favorite', () => {
        test('succes get favorite', async () => {
            let { status, body } = await request(app).get('/favorite').set('Authorization', `Bearer ${token}`)
            expect(status).toBe(200)
        })

    })

    describe('GET /favorite', () => {
        test('succes get favorite by id', async () => {
            const id = 1
            const { status } = await request(app)
                .get(`/favorite/UserId/${id}`)
                .set('Authorization', `Bearer ${token}`)
            expect(status).toBe(200)
        })

    })

    describe('POST /favorite', () => {
        test('succes Add favorite', async () => {
            let favorite = {
                avatarUrl: "https://yt3.ggpht.com/ytc/AIf8zZRk7wPdrke93AYdRm7XrsKiBYWM-0RnH_m6s0EHSw=s48-c-k-c0x00ffffff-no-rj",
                type: "video",
                canonicalBaseUrl: "https://youtube.com/watch",
                channelId: "UCuPivVjnfNo4mb3Oog_frZg",
                titleChannel: "A24",
                description: "RELEASE DATE: April 26, 2024 DIRECTOR: Alex Garland CAST: Kirsten Dunst, Wagner Moura, Stephen McKinley Henderson, and Cailee Spaeny....",
                thumbnailUrl: "http://https://i.ytimg.com/vi/aDyQxtg0V2w/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDXCAW57VRLXdLVYaNTQgll49hunA",
                views: "2220991",
                videoId: "aDyQxtg0V2w",
                titleVideo: "Civil War | Official Trailer HD | A24"
            }
            let { status, body } = await request(app)
                .post('/favorite')
                .set('Authorization', `Bearer ${token}`)
                .send(favorite)
            expect(status).toBe(200)
            expect(body).toHaveProperty('message')
        })
    })

    describe('DELETE /favorite/:id', () => {
        test('succes delete favorite', async () => {
            const favoriteId = 1
            let { status, body } = await request(app)
                .delete(`/favorite/${favoriteId}`)
                .set('Authorization', `Bearer ${token}`)
            expect(status).toBe(200)
            expect(body).toHaveProperty('message')
        })
    })
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
    await queryInterface.bulkDelete('Favorites', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})


