const blogRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)

    if (blog) {
      response.json(formatBlog(blog))
    } else {
      response.status(404).end()
    }

  } catch (exception) {
    response.status(400).send({ error: 'bad request' })
  }
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
  response.json(formatBlog(savedBlog))
})

blogRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()

  } catch (exception) {
    response.status(400).send({ error: 'bad request' })
  }
})


blogRouter.put('/:id', (request, response) => {
  const body = request.body
console.log(body)
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  Blog
    .findByIdAndUpdate(request.params.id, newBlog, { new: true } )
    .then(updatedBlog => {
      console.log(updatedBlog)
      response.json(formatBlog(updatedBlog))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'bad request' })
    })
})

module.exports = blogRouter