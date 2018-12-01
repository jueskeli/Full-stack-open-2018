import React from 'react'
import { clear } from './../reducers/anecdoteReducer'
import { connect } from 'react-redux'

class Notification extends React.Component {

  show = (message) => {
    setTimeout(() => {
      this.props.clear()
    }, 3500)
    return message
  }

  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    const message = this.props.message
    console.log('MESG:', message)

    if(message === '') return null

    return (
      <div style={style}>
        {this.show(message)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}

const ConnectedNotification = connect(
  mapStateToProps,
  { clear }
)(Notification)

export default ConnectedNotification
