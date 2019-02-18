const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  User
    .find({})
    .then(users => {
      response.json(users)
    })
})

usersRouter.post('/', async (request, response, next) => {  
  try {
    const body = request.body
    
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