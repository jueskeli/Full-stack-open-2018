import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import About from './components/About'
import { connect } from 'react-redux'
import { anecdoteInitialization } from './reducers/anecdoteReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap'

const home = {
  background: 'lightgrey',
  borderRadius: 5,
  padding: 50,
  borderWidth: 1,
}

const Home = () => (


  <Grid style={home}>
    <Row className="show-grid">
      <Col xs={8} md={6}>
        <div>
          <h2>Anekdoottiappi</h2>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </Col>
      <Col xs={8} md={6}>
        <h2> Wikipedian määritys anekdootista:</h2>
        <div>
          Anekdootti on lyhyt ja mahdollisesti todentamaton, usein viihteellinen tai humoristinen, tarina henkilöstä 
          tai tapahtumasta. Anekdootti on yleensä liioiteltu, pelkistetty tai karrikoitu. Sen ensisijainen tarkoitus 
          ei kuitenkaan ole naurattaa vaan kertoa henkilöstä, tapahtumasta tai asiasta jokin olennainen seikka, yleispätevä 
          ja jopa universaali totuus. 
        </div>
        <div>Anekdootin alalajeja ovat esimerkiksi niin sanotut kaupunkitarinat, tornihuhut, kaskut tai vaikkapa vitsit.</div>
      </Col>
    </Row>
    <Row>
      <div>

      </div>
    </Row>
  </Grid>
)


class App extends React.Component {

  componentDidMount () {
    this.props.anecdoteInitialization()
  }

  render() {
    const style = {
      border: 'solid',
      background: 'lightblue',
      borderRadius: 5,
      padding: 10,
      borderWidth: 1,
      marginBottom: 40,
      marginTop: 10
    }

    const footer = {
      color: 'lightgrey',
      borderWidth: 1,
      textAlign: 'center',
      marginTop: 100
    }

    return (
      <div>
        <Notification />
        <Router>
          <div>
            <div style={style}>
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
        <div style={footer}>
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