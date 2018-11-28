import React from 'react';

const getId = () => (100000*Math.random()).toFixed(0)

const actionFor = {
  vote(anecdote) {
    console.log('action for:', anecdote)
    return {
      type: 'VOTE',
      data: {
        id: anecdote.id,
        content: anecdote.content,
        votes: anecdote.votes
      }
    }
  },
  create(content) {
    return {
      type: 'CREATE',
      data: {
        id:  getId(),
        content: content,
        votes:0
      }
    }
  }
}


class App extends React.Component {

  vote = (anecdote) => (event) => {
    console.log('event:', anecdote)
    event.preventDefault()
    this.props.store.dispatch(
      actionFor.vote(anecdote)
    )
    anecdote = 0
  }

  create = (event) => {
    event.preventDefault()
    this.props.store.dispatch(
      actionFor.create(event.target.anecdote.value)
    )
    event.target.anecdote.value = ''
  }

  render() {
    const anecdotes = this.props.store.getState()

    anecdotes.sort(function(a, b) {
      if (a.votes < b.votes) {
        return 1;
      }
      if (a.votes > b.votes) {
        return -1;
      }
      return 0;
    })
    
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.create}>
          <input name='anecdote' />
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App