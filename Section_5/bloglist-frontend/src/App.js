import React from 'react'
import blogService from './services/blogs'
import Notification from './components/notification'
import loginService from './services/loginService'
import LoginForm from './components/LoginForm'
import BlogForm from './components/blogForm'
import Togglable from './components/togglable'
import BlogToggler from './components/blogToggler'

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

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }    
  }

  like = (blog) => (event) => {
    event.preventDefault()

    const newBlog = {
      user:   blog.user[0]._id,
      likes:  blog.likes + 1,
      author: blog.author,
      title:  blog.title,
      url:    blog.url
    }
    
    blogService
      .update(blog.id, newBlog)
      .then(returnBlog => {
        console.log(returnBlog)
        this.setState({
          blogs: this.state.blogs.map(function(b) {return b.id !== blog.id ? b : returnBlog}),
          success: true,
          message: `blog ${blog.title} by ${blog.author} updated`
        })
        setTimeout(() => {
          this.setState({message: null, success: false})
        }, 3500)
      })
  }

  //Backendiä muokattu siten, että palauttaa taulukon, joka sisältää user olion(kuten get all tapauksessa), pelkän id:n sijaan.
  //Aikaisempi aiheutti sen, että ilman sivun päivitystä käyttäjän nimi oli undefined.
  addBlog = (event) => {
    event.preventDefault()

    this.blogForm.toggleVisibility()
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

  delete = (blog) => (event) => {
    event.preventDefault()
    const result = window.confirm(`delete blog '${blog.title}' by ${blog.author} ?`)

    if(result){
      blogService
        .remove(blog.id)
        .then(response => {
          this.setState({
            blogs: this.state.blogs.filter(b => b.id !== blog.id),
            success: true,
            message: `Blog ${blog.title} by ${blog.author} removed`
          })
          setTimeout(() => {
            this.setState({message: null, success: false})
          }, 3500)
        })
        .catch(error => {
          this.setState({
            message: `poisto epäonnistui`,
            blogs: this.state.blogs.filter(b => b.id !== blog.id)
          })
        setTimeout(() => {
            this.setState({message: null})
          }, 3500)
      })
    }
  }

  login = async (event) => {

    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
  
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      console.log(user)
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
    window.localStorage.removeItem('loggedBlogAppUser')
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
    const blogForm = () => (
      <Togglable buttonLabel="uusi blogi" ref={component => this.blogForm = component}>
        <BlogForm            
          handleSubmit={this.addBlog} 
          handleChange={this.handleBlogChange} 
          newTitle={this.state.newTitle} 
          newAuthor={this.state.newAuthor}
          newURL={this.state.newURL}
          newContent={this.state.newContent}
        />
      </Togglable>
    )

    const blogsToShow = this.state.blogs.sort(function(a, b) {
      if (a.likes < b.likes) {
        return 1;
      }
      if (a.likes > b.likes) {
        return -1;
      }
      return 0;
    })

    return (
      <div>
        <h1>BLOG APPLICATION</h1>

       <Notification message={this.state.message} type={this.state.success}/>

        {this.state.user === null ?
            <Togglable buttonLabel="login"> 
              <LoginForm
                username={this.state.username}
                password={this.state.password}
                handleChange={this.handleLoginFieldChange}
                handleSubmit={this.login}
              />
            </Togglable> :
            <div>
              <div>
                {this.state.user.name} logged in            
              </div>
              <button onClick={this.logOut}>kirjaudu ulos</button>
              {blogForm()}
              {console.log(blogsToShow)}
              <h2>blogs added:</h2>
              {blogsToShow.map(blog => 
                <BlogToggler 
                   key={blog.id} 
                   title={blog.title}
                   likes={blog.likes}  
                   author={blog.author} 
                   like={this.like(blog)} 
                   delete={this.delete(blog)}
                   username={blog.user[0] !== undefined ? blog.user[0].username : ''} 
                   user={this.state.user.username} 
                   url={blog.url}>
                </BlogToggler>
              )}
            </div>
        }
        <ul>This is a blog application made for the FullStack Open 2018 course.</ul>
        <ul>Author: Juuso-Julius Eskelinen</ul>
      </div>
    );
  }
}

export default App;
