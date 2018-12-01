import React from 'react'
import { filter } from './../reducers/anecdoteReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
    handleChange = (event) => {
      console.log('E :', event.target.value)
      event.preventDefault()
      this.props.filter(event.target.value)
    }

    render() {
      return (
        <form onChange={this.handleChange}>
          <div>find anecdotes<input name='filter'/></div>
        </form>
      )
    }
}

const ConnectedFilter = connect(
  null,
  { filter }
)(Filter)

export default ConnectedFilter
