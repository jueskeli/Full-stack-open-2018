const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { listWithManyBlogs, listWithOneBlog, format, nonExistingId, blogsInDb} = require('./test_helper')

describe('Blog API tests', async () => {
  beforeAll(async () => {
    await Blog.remove({})
    const blogs = listWithManyBlogs.map(n => new Blog(n))
    await Promise.all(blogs.map(n => n.save()))
  })

  test('GET all blogs', async () => {
    const blogsInDataBase = await blogsInDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogsInDataBase.length)

    const returnedTitles = response.body.map(n => n.title)
    blogsInDataBase.forEach(blog => {
      expect(returnedTitles).toContain(blog.title)
    })
  })

  test('get a blog', async () => {
    const blogsInDataBase = await blogsInDb()

    const responseBlog = await api
      .get(`/api/blogs/${blogsInDataBase[0].id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(responseBlog.body.title).toBe(blogsInDataBase[0].title)
  })


  describe('Testing POST operation', async () => {

    test('add a new blog', async () => {
      const blogsInDataBase = await blogsInDb()

      await api
        .post('/api/blogs')
        .send(listWithOneBlog[0])
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAfter = await blogsInDb()

      expect(blogsAfter.length).toBe(blogsInDataBase.length + 1)

      const titles = blogsAfter.map(r => r.title)
      expect(titles).toContain('Go To Statement Considered Harmful2')
    })

    test('Add empty blog', async () => {

      const blogsInDataBase = await blogsInDb()

      const dummyBlog = {
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(dummyBlog)
        .expect(400)

      const blogsAfter = await blogsInDb()

      expect(blogsAfter.length).toBe(blogsInDataBase.length)
    })
    
    test('Add blog without url', async () => {
      const blogsInDataBase = await blogsInDb()

      const newBlog = new Blog({
        title: 'hohoho',
        author: 'hihihi'
      })
  
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
  
      const blogsAfter = await blogsInDb()
  
      expect(blogsAfter.length).toBe(blogsInDataBase.length)
    })

    test('Add blog with empty likes field', async () => {

      const newBlog = new Blog({
        title: 'hohoho',
        author: 'hihihi',
        url: 'hihohoho.fi'
      })
  
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const blogsAfter = await blogsInDb()

      for(let blog in blogsAfter){
        if(blog.title === 'Go To Statement Considered Harmful2') {
          expect(blog.likes).toBe(0)
        }
      }
    })
  })
  
  describe('Testing DELETE operation', async () => {
    const newBlog = new Blog({
      title: 'hohoho2',
      author: 'hihihi2',
      url: 'hihohoho.fi2'
    })

    beforeAll(async () => {
      await newBlog.save()
    })

    test('DELETE newly added Blog', async () => {
      const blogsBefore = await blogsInDb()

      await api
        .delete(`/api/blogs/${newBlog._id}`)
        .expect(204)

      const blogsAfter = await blogsInDb()

      const titles = blogsAfter.map(r => r.title)

      expect(titles).not.toContain(newBlog.title)
      expect(blogsAfter.length).toBe(blogsBefore.length - 1)
    })
  })
  
})


afterAll(() => {
  server.close()
})
