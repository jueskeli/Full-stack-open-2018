import React from 'react'
import { clear } from './../reducers/anecdoteReducer'

class Notification extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true
    }
  }

  show = (message) => {
    setTimeout(() => {
      this.props.store.dispatch(clear())
    }, 3500)
    return message
  }

  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    const message = this.props.store.getState().message
    console.log('MESG:', message)

    if(message === '') return null

    return (
      <div style={style}>
        {this.show(message)}
      </div>
    )
  }
}

export default Notification
