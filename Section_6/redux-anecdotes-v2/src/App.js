import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import About from './components/About'
import { connect } from 'react-redux'
import { anecdoteInitialization } from './reducers/anecdoteReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Anekdoottiappi</h2>

    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </div>
)


class App extends React.Component {

  componentDidMount () {
    this.props.anecdoteInitialization()
  }

  render() {
    return (
      <div>
        <Notification />
        <Router>
          <div>
            <div>
              <Link to="/">home</Link> &nbsp;
              <Link to="/anecdotes">anecdotes</Link> &nbsp;
              <Link to="/about">about</Link> &nbsp;
              <Link to="/create">create</Link>
            </div>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/anecdotes" render={() => <AnecdoteList router={Link} />} />
            <Route path="/about" render={() => <About />} />
            <Route path="/create" render={() => <AnecdoteForm route={Route}/>} />
            <Route exact path="/anecdotes/:id" render={({ match }) =>
              <Anecdote anecdote={match.params.id} r/>}
            />
          </div>
        </Router>
        <div>
          <em>Anecdote app for Full Stack -open course.</em>
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  { anecdoteInitialization }
)(App)