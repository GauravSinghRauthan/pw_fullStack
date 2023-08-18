const express = require('express')
const app = express()
require('dotenv').config()
const { models } = require('mongoose')
const connectTODB = require('./config/dbConfig')
const authRouter = require('./router/router')
const cookieParser = require('cookie-parser')
const cors = require("cors")

app.use(cors({
    origin:"http://localhost:5500",
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())
// connect to database
connectTODB()

app.use('/auth/api',authRouter)


module.exports = app