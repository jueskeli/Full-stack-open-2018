import React from 'react'
import { vote, msg } from './../reducers/anecdoteReducer'
import Filter from './../components/Filter'

class AnecdoteList extends React.Component {


  handleKlik = (id) => (e) => {
    e.preventDefault()
    this.props.store.dispatch(vote(id))
    this.props.store.dispatch(msg('Voted anecdote'))
  }

  render() {
    const anecdotes = this.props.store.getState().anecdotes.filter(a => a.content.includes(this.props.store.getState().filter))
    return (
      <div>
        <Filter store={this.props.store} anecdotes={anecdotes} />
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.handleKlik(anecdote.id)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
