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
    const form ={
      maxWidth: 400,
      background: 'lightgrey',
      borderRadius: 5,
      padding: 5
    }

    const input = {
      display: 'block',
      width: 300,
      fontSize: 16,
      padding: 5,
      marginBottom: 10
    }

    if (this.state.added) {
      return <Redirect to="/anecdotes" />
    }

    return (
      <div style={form}>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit} >
          <div>Sisältö :<input style={input} name='anecdote'/></div>
          <div>Tekijä :<input style={input} name='author'/></div>
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
