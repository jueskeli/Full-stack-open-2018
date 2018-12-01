import React from 'react'
import anecdoteService from '../services/anecdotes'
import { connect } from 'react-redux'
import { vote, msg } from './../reducers/anecdoteReducer'

const Anecdote = ( props ) => {
  console.log(props)
  const anecdote = props.anecdotes.find(anec => anec.id === Number(props.anecdote))
  console.log('ANEC', anecdote)
  return(
    <div>
      <h2>{anecdote.content}</h2>
      <p>Tehnyt : {anecdote.author}</p>
      <div>
        has {anecdote.votes}
        <button onClick={ async () => {
          anecdote.votes = anecdote.votes + 1
          const updatedAnec = await anecdoteService.update(anecdote.id, anecdote)
          props.vote(updatedAnec)
          props.msg('Voted anecdote', 3)}}>
          vote
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('A :', state.anecdotes)
  return {
    anecdotes: state.anecdotes
  }
}

const ConnectedDote = connect(
  mapStateToProps,
  { vote, msg }
)(Anecdote)

export default ConnectedDote

