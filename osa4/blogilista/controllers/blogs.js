const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const {blogs} = require('../tests/example_blogs')

blogsRouter.get('/init', async (req, resp) => {
  existingBlogs = await Blog.find({})
  logger.info(`Let's init the DB, we have ${existingBlogs.length} blogs atm and the init file has ${blogs.length}`)
  let added = 0
  for (const key in blogs) {
    if (blogs.hasOwnProperty(key)) {
      const blog = Blog(blogs[key]);
      const existing = await Blog.find(blog)
      if (existing.length === 0) {
        added += 1
        logger.info("lets add a blog ", blog)
        await Blog(blog).save()
      }
    }
  }

  resp.status(200).end(`blogs-app DB successfully initiated; we added ${added}`)
})

blogsRouter.get('/removeall', async (request, response) => {
  await Blog.remove({})
  response.status(200).end('all blogs removed')
})

blogsRouter.get('/', async (request, response) => {
  Blog
    .find({})
    .populate('user', {username:1, name:1, id:1})
    .then(blogs => {
      response.json(blogs)
    })
})
  
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  //valid request?
  if (!body.title || !body.url) {
    response.status(400).end()
    return
  }
  
  if (!body.likes) {
    body.likes = 0
  }
  
  try {
    //signed in?
    const token = request.token
    
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    // console.log('token and decoded', token, decodedToken);
    
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    // const users = await User.find({})
    // const user = users[0]
    const blog = new Blog( {...request.body, "user": user._id})
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
    response.status(400)
  }
})

blogsRouter.delete("/:id", async (req, resp) => {
  result = await Blog.findByIdAndRemove(req.params.id)

  logger.info('delete succeeded with result:', result)
  resp.status(204).end()
})

blogsRouter.put("/:id", async (req, resp) => {
  logger.info('put with id', req.params.id)
  const blog = Blog(req.body)

  updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  
  logger.info(`updated blog ${updatedBlog}`)
  resp.json(updatedBlog.toJSON())
})

module.exports = blogsRouter