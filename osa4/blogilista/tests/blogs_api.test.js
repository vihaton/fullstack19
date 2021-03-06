const mongoose = require("mongoose")
const supertest = require('supertest')
const app = require('../app')
const Blog = require("../models/blog")
const User = require("../models/user")
const {blogs} = require("./example_blogs")
const users = require("./example_users")

const api = supertest(app)

let token = ""

beforeEach(async () => {
  await Blog.remove({})
  
  let blogObject = new Blog(blogs[0])
  await blogObject.save()
  
  blogObject = new Blog(blogs[1])
  await blogObject.save()

  await User.remove({})
  await api
  .post('/api/users')
  .send(users[0])
})

describe("basic tests for blogs", () => {

  test('blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  })
  
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    
    expect(response.body.length).toBe(2)
  })
  
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    
    const titles = response.body.map(r => r.title)
    
    expect(titles).toContainEqual(
      'React patterns'
    )
  })
})

describe("4.9*-4.12*", () => {
  test("id is id not _id", async () => {
    const resp = await api.get("/api/blogs")
    
    expect(resp.body[0].id).toBeDefined()
  })

  test("4.10 post", async () => { 
    await api
    .post('/api/blogs')
    .send(blogs[2])
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body.length).toBe(3)
    expect(titles).toContainEqual(
      blogs[2].title
    )
  })

  test("4.11* if likes is not defined, it's set to 0", async () => {
    woLikes = blogs[4]
    delete woLikes.likes

    await api
    .post('/api/blogs')
    .send(woLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const likes = response.body.map(r => r.likes)

    expect(response.body.length).toBe(3)
    likes.forEach(like => {
      expect(like).not.toBeUndefined()
    });

  })
  test("4.12* if url or title is not defined, return 400", async () => {
    woUrl = blogs[4]
    delete woUrl.url

    await api
    .post('/api/blogs')
    .send(woUrl)
    .expect(400)

    woTitle  = blogs[3]
    delete woTitle.title

    await api
    .post('/api/blogs')
    .send(woTitle)
    .expect(400)

    const response = await api.get('/api/blogs')
    
    expect(response.body.length).toBe(2)

  })
})
    
    afterAll(() => {
  mongoose.connection.close()
})