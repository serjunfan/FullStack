const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const helper = require('./helper')
const User = require('../models/users')

beforeEach( async() => {
  await Blog.deleteMany({})
  //Promise.all execute promise received parallel with no specific
  //order, so we can use for...of instead if some order needed.
  /*
  const blogObjects = helper.initialBlogs.map( blog => new Blog(blog))
  const promiseArray = blogObjects.map( blog => blog.save())
  await Promise.all(promiseArray)
  */
  for( let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})


const api = supertest(app)

test('blogs are returned as json', async() => {
  await api
  .get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)
})

describe('About get method(one, findbyid, all)', () => {
test('one blog can be found', async() => {
  const blogsAtStart = await helper.blogInDb()

  const targetBlog = blogsAtStart[0]

  const resultBlog = await api
  .get(`/api/blogs/${targetBlog.id}`)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  expect(resultBlog.body).toEqual(targetBlog)
})

test('all blogs are returned and each has id property', async() => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  expect(blogs).toHaveLength(helper.initialBlogs.length)
  for(let blog of blogs) {
    expect(blog.id).toBeDefined()
  }
})

test('a specific blog is within returned blog', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map( r => r.author)
  expect(contents).toContain('ada')
})

})

test('a valid blog can be added', async () => {
  const users = await User.find({})
  console.log(`users = ${users}`)
  const firstId = users[0]._id
  console.log(firstId)
  const newBlog = {
    title: 'test add blog',
    author: 'test',
    url: 'test',
    likes: 123,
    user: firstId 
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map( r => r.author)
  expect(response.body).toHaveLength(helper.initialBlogs.length+1)
  expect(contents).toContain('test')
})

test('delete by id', async () => {
  const blogsAtStart = await helper.blogInDb()
  const blogToDelete = blogsAtStart[0]
  //console.log(blogToDelete.id)
  await api
  .delete(`/api/blogs/${blogToDelete.id}`)
  .expect(204)

  const blogsAfterDelete = await helper.blogInDb()
  expect(blogsAfterDelete).toHaveLength(blogsAtStart.length - 1)
})

afterAll(async () => {
  await mongoose.connection.close()
})
