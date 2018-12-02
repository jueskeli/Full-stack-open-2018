import React from 'react'
import { vote, msg } from './../reducers/anecdoteReducer'
import Filter from './../components/Filter'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'

const style = {
  marginRight: 80,
  marginLeft: 30,
  border: 'solid',
  borderRadius: 5,
  padding: 50,
  borderWidth: 1,
}

const AnecdoteList = (props) => {
  return (
    <div style= {style}>
      <Filter />
      <h2>Anecdotes</h2>
      <Table responsive bordered>
        <tbody>
          {props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
            <tr key={anecdote.id}>
              <td>
                <props.router to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</props.router>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
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
