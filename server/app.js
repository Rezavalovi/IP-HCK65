require('dotenv').config()
const express = require('express')
const errorHandler = require('./middlewares/errorHandler')
const cors = require("cors")
const router = require('./routes')

const app = express()
const port = 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)


app.listen(port, () => {
    console.log(`Server ready on http://localhost: ${port}`)
})
