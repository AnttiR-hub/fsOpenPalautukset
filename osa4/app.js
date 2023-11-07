const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
require('dotenv').config()

const mongoUrl = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODBURI : process.env.MONGODBURI

mongoose.connect(mongoUrl).then(console.log('connected to ' + mongoUrl))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app