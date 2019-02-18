const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  User
    .find({})
    .populate('blogs', {title:1, author:1, url:1, id:1})
    .then(users => {
      response.json(users)
    })
})

usersRouter.post('/', async (request, response, next) => {  
  try {
    const body = request.body

    if (body.password.length < 4) {
      response.status(400).end("password too short")
      return
    }
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    response.status(400)
    next(exception)
  }
})

module.exports = usersRouter