import React from 'react'
import { clear } from './../reducers/anecdoteReducer'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      color: 'green',
      background: 'lightgrey',
      borderRadius: 5,
      padding: 10,
      borderWidth: 1
    }

    const message = this.props.message
    console.log('MESG:', message)

    if(message === '') return null

    return (
      <div style={style}>
        {this.props.message}
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
