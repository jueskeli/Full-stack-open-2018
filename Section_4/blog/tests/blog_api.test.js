const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a6762312337f8',
    title: 'Go To Statement Considered Harmful2',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 0,
    __v: 0
  }
]

const listWithManyBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }  
]


describe('Blog API tests', async () => {
  beforeAll(async () => {
    await Blog.remove({})
    const blogs = listWithManyBlogs.map(n => new Blog(n))
    await Promise.all(blogs.map(n => n.save()))
  })

  test('GET all blogs', async () => {

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(listWithManyBlogs.length)

    const returnedTitles = response.body.map(n => n.title)
    listWithManyBlogs.forEach(blog => {
      expect(returnedTitles).toContain(blog.title)
    })
  })


  describe('Testing POST operation', async () => {

    test('add a new blog', async () => {

      await api
        .post('/api/blogs')
        .send(listWithOneBlog[0])
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAfter = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(blogsAfter.body.length).toBe(listWithManyBlogs.length + 1)

      const titles = blogsAfter.body.map(r => r.title)
      expect(titles).toContain('Go To Statement Considered Harmful2')
      
      //Update the local list to match with the database
      listWithManyBlogs.push(listWithOneBlog[0])
    })

    test('Add empty blog', async () => {

      const dummyBlog = {
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(dummyBlog)
        .expect(400)

      const blogsAfter = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(blogsAfter.body.length).toBe(listWithManyBlogs.length)
    })
    
    test('Add blog without url', async () => {
      const newBlog = new Blog({
        title: 'hohoho',
        author: 'hihihi'
      })
  
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
  
      const blogsAfter = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      expect(blogsAfter.body.length).toBe(listWithManyBlogs.length)
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
  
      const blogsAfter = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)


      for(let blog in blogsAfter){
        if(blog.title === 'Go To Statement Considered Harmful2') {
          expect(blog.likes).toBe(0)
        }
      }

      //Update the local list to match with the database
      listWithManyBlogs.push(listWithOneBlog[0])
    })
  })

  afterAll(() => {
    server.close()
  })

})