import React from 'react'
import { vote, msg } from './../reducers/anecdoteReducer'
import Filter from './../components/Filter'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      <ul>
        {props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <li key={anecdote.id}>
            <props.router to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</props.router>
          </li>
        )}
      </ul>
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
