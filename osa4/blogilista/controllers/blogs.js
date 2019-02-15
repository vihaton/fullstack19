const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
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

blogsRouter.get('/', async (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})
  
blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.title || !blog.url) {
    response.status(400).end()
    return
  }
  
  if (!blog.likes) {
    blog.likes = 0
  }

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
  })
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