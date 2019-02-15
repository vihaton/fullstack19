const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

const url = config.MONGODB_URI

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(url, { useNewUrlParser: true })
  .then( () => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('failed to connect with error', error)
  })

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app