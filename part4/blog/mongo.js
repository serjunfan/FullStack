const mongoose = require('mongoose')
require('dotenv').config()
const url = process.env.TEST_MONGODB_URI
const Blog = require('./models/blogs')

mongoose.set('strictQuery', false)
console.log(`connecting to uri = ${url}`)
mongoose.connect(url)
console.log('connection success')


const insert = ( input ) => {
  const testBlog = new Blog({
    title: input.title,
    author: input.author,
    url: input.url,
    likes: input.likes
  })
  testBlog.save().then(result => {
    console.log(`add ${input.title} to db`)
    mongoose.connection.close()
  })
}


const newBlog = {
  title: 'didaida',
  author: 'me',
  url: 'jgoidjrogdoij',
  likes: 10
}

insert(newBlog)

