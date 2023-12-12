const express = require('express')
const Controller = require('./controllers/userController')
const errorHandler = require('./middlewares/errorHandler')
const cors = require("cors")
const router = require('./routes')

const app = express()
const port = 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)


//users endpoint
app.post('/register', Controller.register)
app.post('/login', Controller.login)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})