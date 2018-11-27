let token = null

const blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    likes: 100,
    url: 'www.testi.fi',     
    title: 'testTitle',
    author: 'testAuthor',
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "juuso",
      name: "Juuso Eskelinen"
    }
  },
    {
        id: "5a451df757121412431b5c8ce",
        likes: 101,
        url: 'www.testi2.fi',     
        title: 'testTitle2',
        author: 'testAuthor2',
        user: {
          _id: "5a437a9e514ab7f168ddf138",
          username: "juuso",
          name: "Juuso Eskelinen"
        }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
    token = `bearer ${newToken}`
  }
  

export default { getAll, blogs, setToken}