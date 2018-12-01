import React from 'react'
import { createAnecdote , msg } from './../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { BrowserRouter as Route, Redirect} from 'react-router-dom'

class AnecdoteForm extends React.Component {
  constructor() {
    super()
    this.state = {
      added: false
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    let content = e.target.anecdote.value
    const author = e.target.author.value
    e.target.anecdote.value = ''
    e.target.author.value = ''
    this.props.createAnecdote(content, author)
    this.props.msg(`Added anecdote ${content}`, 10)
    this.setState({
      added: true
    })
  }

  render() {

    if (this.state.added) {
      return <Redirect to="/anecdotes" />
    }

    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div>Sisältö :<input name='anecdote'/></div>
          <div>Tekijä :<input name='author'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const ConnectedForm = connect(
  null,
  { createAnecdote, msg }
)(AnecdoteForm)

export default ConnectedForm
