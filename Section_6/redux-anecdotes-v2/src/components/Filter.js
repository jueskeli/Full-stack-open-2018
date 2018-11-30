import React from 'react'
import { filter } from './../reducers/anecdoteReducer'

class Filter extends React.Component {
    handleChange = (event) => {
      console.log('E :', event.target.value)
      event.preventDefault()
      this.props.store.dispatch(filter(event.target.value))
    }

    render() {
      return (
        <form onChange={this.handleChange}>
          <div>find anecdotes<input name='filter'/></div>
        </form>
      )
    }
}

export default Filter
