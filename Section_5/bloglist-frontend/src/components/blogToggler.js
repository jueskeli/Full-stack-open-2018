import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

class BlogToggler extends React.Component {
  constructor(props) {
     super(props)
     this.state = {
      visible: false,
      remove: this.props.username === this.props.user || this.props.username === '' || this.props.username === undefined
     }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  render() {
    const style ={ marginBottom: 10}

    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    const canRemove = {display: this.state.remove ? '' : 'none'}

    console.log(this.props)

    return (
      <table>
        <tbody>
        <tr style={hideWhenVisible}>
          <td onClick={this.toggleVisibility} className='togglableInfo'>
            {this.props.title},    By: {this.props.author}
           </td>
        </tr>
        <tr style={showWhenVisible}>
         <td onClick={this.toggleVisibility}  className='toggledInfo'>{this.props.title},    By: {this.props.author}</td>
            <td className="blog">
              <li>URL: {this.props.url}:</li>
              <li>likes: {this.props.likes}</li>
              <li>Added by {this.props.user}</li>
            </td>
          <td>
          <Button style ={style} className='like' onClick={this.props.like}>tykkää</Button>
          <Button  style={canRemove} className='delete' onClick={this.props.delete}>poista</Button>
          </td>
        </tr>
        </tbody>
      </table>
    )
  }
}

BlogToggler.propTypes = {
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }

export default BlogToggler
