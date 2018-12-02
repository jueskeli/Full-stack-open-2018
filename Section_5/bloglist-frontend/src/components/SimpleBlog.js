import React from 'react'
import { Button } from 'semantic-ui-react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className='content'>
      {blog.title} {blog.author}
    </div>
    <div className='likes'>
      blog has {blog.likes} likes
      <Button onClick={onClick}>like</Button>
    </div>
  </div>
)

export default SimpleBlog