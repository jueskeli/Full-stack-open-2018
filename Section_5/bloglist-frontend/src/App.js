import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/notification'
import loginService from './services/loginService'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newTitle: '',
      newAuthor: '',
      newURL: '',
      newContent: '',
      message: null,
      success: false,
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService
      .getAll()
      .then(returnBlogs => {
        this.setState({ blogs: returnBlogs })
      })

    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }    
  }

  addBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: this.state.newTitle,
      author: this.state.newAuthor,
      url: this.state.newURL,
      content: this.state.newContent,
      likes : 0
    }

    console.log(blog)

    blogService
      .create(blog)
      .then(returnBlog => {
        console.log(returnBlog)
        this.setState({
          blogs: this.state.blogs.concat(returnBlog),
          newTitle: '',
          newAuthor: '',
          newURL: '',
          newContent: '',
          success: true,
          message: `a new blog ${blog.title} by ${blog.author} added`,
        })
        setTimeout(() => {
          this.setState({message: null, success: false})
        }, 3500)
      })
  }

  login = async (event) => {

    event.preventDefault()
    try {

      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
  
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ 
        username: '',
        password: '',
        user
      })
    } 
    catch(exception) {
      this.setState({
        message: 'virheellinen käyttäjätunnus tai salasana'
      })
      setTimeout(() => {
        this.setState({message: null})
      }, 3500)
    }
  }


  logOut = (event) => {
    event.preventDefault() 
    window.localStorage.removeItem('loggedNoteappUser')
      blogService.setToken(null)
      this.setState({ 
        username: '',
        password: '',
        user: null
      })

  }

  handleBlogChange = (event) => {
    this.setState({[event.target.name]: event.target.value })
  }

  handleLoginFieldChange = (event) => {
    this.setState({[event.target.name]: event.target.value })
  }

  render() {
    const loginForm = () => (
      <div>
        <h2>Kirjaudu sisään</h2>
        <form onSubmit={this.login}>
          <div>
            Käyttäjätunnus:
            <input
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            Salasana:
            <input
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button>Kirjaudu sisään</button>
        </form>
      </div>
    )

    const blogForm = () => (
      <div>
        <h2>Uusi blogimerkintä:</h2>

        <form onSubmit={this.addBlog}>
          <div>
            Nimi
            <input
              type = 'text'
              name = 'newTitle'
              value = {this.state.newTitle}
              onChange = {this.handleBlogChange}
            />
          </div>
          <div>
          Kirjoittaja
            <input
              type = 'text'
              name = 'newAuthor'
              value = {this.state.newAuthor}
              onChange = {this.handleBlogChange}
            />
          </div>
          <div>
            URL
            <input
              type = 'text'
              name = 'newURL'
              value = {this.state.newURL}
              onChange = {this.handleBlogChange}
            />
          </div>
          <div>
            Sisältö
            <textarea
              type = 'text'
              name = 'newContent'
              value = {this.state.newContent}
              onChange = {this.handleBlogChange}
            />
          </div>
          <button>tallenna</button>
        </form>
      </div>
    )

    return (
      <div>
        <h1>BLOGS</h1>

       <Notification message={this.state.message} type={this.state.success}/>

        {this.state.user === null ?
            loginForm() :
            <div>
              <div>
                {this.state.user.name} logged in 
                 <button onClick={this.logOut}>kirjaudu ulos</button>
              </div>
              {blogForm()}
              {console.log(this.state.blogs)}
              <h3>blogs added:</h3>
              {this.state.blogs.map(blog => 
                <Blog key={blog.id} blog={blog}/>
              )}

            </div>
        }
      </div>
    );
  }
}

export default App;
