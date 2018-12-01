import React from 'react'
import { vote, msg } from './../reducers/anecdoteReducer'
import Filter from './../components/Filter'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteList = (props) => {
  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      {props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
              has {anecdote.votes}
            <button onClick={ async () => {
              anecdote.votes = anecdote.votes + 1
              const updatedAnec = await anecdoteService.update(anecdote.id, anecdote)
              console.log('AFTER_PUT:', anecdote)
              props.vote(updatedAnec)
              props.msg('Voted anecdote')}}>
                vote
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('A :', state.anecdotes)
  return {
    anecdotes: state.anecdotes.filter(a => a.content.includes(state.filter))
  }
}

const ConnectedList = connect(
  mapStateToProps,
  { vote, msg }
)(AnecdoteList)

export default ConnectedList
