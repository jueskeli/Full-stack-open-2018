const blogRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')



blogRouter.get('/', async (request, response) => {

  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 } )

  response.json(blogs.map(Blog.format))
})

blogRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)

    if (blog) {
      response.json(Blog.format(blog))
    } 
    else {
      response.status(404).end()
    }

  } catch (exception) {
    response.status(400).send({ error: 'bad request' })
  }
})
  
blogRouter.post('/', async (request, response) => {
  try {
    const body = new Blog(request.body)
    console.log(body)

    
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'Anna validi token !' })
    }
  
    if(body.title === undefined || body.author == undefined || body.url == undefined) {
      return response.status(400).json({error: 'Otsikko, kirjoittaja tai URL puuttuu!'})
    }

    if(body.likes === undefined) {
      body.likes = 0
    }

    const user = await User.findById(decodedToken.id)
    console.log(user)

    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await newBlog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(Blog.format(savedBlog))

  } catch(exception) {

    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })

    } 
    else {
      console.log(exception)
      response.status(500).json({ error: 'Jokin meni pieleen' })
    }
  }
})

blogRouter.delete('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'Anna validi token !' })
    }
    console.log(blog)
    console.log(decodedToken)

    if (blog.user.toString() === decodedToken.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }
    else {
      response.status(400).send({ error: 'Et voi poistaa muiden blogeja!' })
    } 

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
      response.json(Blog.format(updatedBlog))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'bad request' })
    })
})

module.exports = blogRouter