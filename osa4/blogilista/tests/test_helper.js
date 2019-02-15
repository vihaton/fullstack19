const User = require('../models/user')
const Blog = require('../models/blog')

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})  
  return users.map(u => u.toJSON())
}

const nonExistingId = 'asdöflkj'

module.exports = {
  nonExistingId,
  blogsInDB,
  usersInDb,
}