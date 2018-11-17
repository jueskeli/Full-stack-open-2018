const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})
  
blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  
  if(blog.title === undefined || blog.author == undefined || blog.url == undefined) {
    return response.status(400).json({error: 'title or author missing'})
  }

  if(blog.likes === undefined) {
    blog.likes = 0
  }

  const newBlog = new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
  })

  const savedBlog = await newBlog.save()
  response.json(Blog.format(savedBlog))
})

module.exports = blogRouter