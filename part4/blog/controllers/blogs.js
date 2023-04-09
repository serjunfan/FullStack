const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const targetBlog = await Blog.findById(request.params.id)
  if(targetBlog) {
    response.json(targetBlog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  console.log(`body = ${body}`)
  console.log(`body.title = ${body.title}`)
  
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid'})
  }
  
  const user = await User.findById(decodedToken.id)
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  console.log(`created blog = ${blog}`)
  const result = await blog.save()
  user.blogs = user.blogs.concat(result.id)
  await user.save()

  response.json(result)
  
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


module.exports = blogsRouter
