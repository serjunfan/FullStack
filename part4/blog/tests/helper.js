const Blog = require('../models/blogs')
const User = require('../models/users')

const initialBlogs = [
  {
    title: 'AAA',
    author: 'GBAN',
    url: 'aofkao',
    likes: 100
  },
  {
    title: 'dojsa',
    author: 'ada',
    url: 'adi09u3219849',
    likes: 0
  }
]

const blogInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map( blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map( user => user.toJSON())
}

module.exports = {
  initialBlogs, blogInDb, usersInDb
}

