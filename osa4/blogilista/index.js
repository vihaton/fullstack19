const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})


// const config = require("./utils/config")
// const express = require('express')
// const app = express()
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const Blog = require('./models/blog')

// app.use(cors())
// app.use(bodyParser.json())

// app.get('/api/blogs', (request, response) => {
//   Blog
//     .find({})
//     .then(blogs => {
//       response.json(blogs)
//     })
// })

// app.post('/api/blogs', (request, response) => {
//   const blog = new Blog(request.body)

//   blog
//     .save()
//     .then(result => {
//       response.status(201).json(result)
//     })
// })

// app.listen(config.PORT, () => {
//   console.log(`Server running on port ${config.PORT}`)
// })