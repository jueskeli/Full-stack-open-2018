import React from 'react'
import { filter } from './../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const style = {
  border: 'solid',
  background: 'lightgrey',
  width: 300,
  borderRadius: 5,
  padding: 5,
  borderWidth: 1,
}


class Filter extends React.Component {
    handleChange = (event) => {
      console.log('E :', event.target.value)
      event.preventDefault()
      this.props.filter(event.target.value)
    }

    render() {
      return (
        <form onChange={this.handleChange} style={style}>
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
