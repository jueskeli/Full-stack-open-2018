import React from 'react'
import { createAnecdote , msg } from './../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newAnec = await anecdoteService.createNew(content)
    console.log('NEW_ANEC:', newAnec)
    this.props.createAnecdote(newAnec)
    this.props.msg('Added anecdote')
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
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
