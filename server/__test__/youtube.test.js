const request = require("supertest")
const app = require('../app.js');

describe('Youtube Routes Tests', () => {
    describe('GET /youtube/trailers', () => {
        test('should get trailers from 3rd Party API', (done) => {
            request(app)
                .get('/youtube/trailers')
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).toBe(200);
                    done()
                });
        });
    })

    describe('GET /youtube/reactjs', () => {
        test('should get reactjs from 3rd Party API', (done) => {
            request(app)
                .get('/youtube/reactjs')
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).toBe(200)
                    done()
                });
        });
    })

        test('should get details video from 3rd Party API', (done) => {
            const id = "124"
            request(app)
                .get(`/youtube/details/${id}`)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(200);
                    done()
                });
        });

        test('should get comment from 3rd Party API', (done) => {
            const id = "1"
            request(app)
                .get(`/youtube/comments/${id}`)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).toBe(200);
                    done()
                });
        });

        test('should get video from 3rd Party API', (done) => {
            const id = "11"
            request(app)
                .get(`/youtube/video/${id}`)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).toBe(200);
                    done()
                });
        });

        test('should search video from 3rd Party API', (done) => {
            const search = "search"
            request(app)
                .get(`/youtube/video/${search}`)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).toBe(200);
                    done()
                });
    })
})

