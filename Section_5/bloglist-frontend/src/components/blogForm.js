import React from 'react'
import { Form, Button } from 'semantic-ui-react'


const BlogForm = ({ handleSubmit, handleChange, newTitle, newAuthor, newURL, newContent }) => {    
    return(
       <Form onSubmit={handleSubmit}>
        <h2>Uusi blogimerkintä:</h2>
          <Form.Field>
            <label>Nimi</label>
            <input
              name = 'newTitle'
              value = {newTitle}
              onChange = {handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Kirjoittaja</label>
            <input
              name = 'newAuthor'
              value = {newAuthor}
              onChange = {handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>URL</label>
            <input
              name = 'newURL'
              value = {newURL}
              onChange = {handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Sisältö</label>
            <textarea
              name = 'newContent'
              value = {newContent}
              onChange = {handleChange}
            />
          </Form.Field>
          <Button type='submit'>tallenna</Button>
        </Form>
    )
}

export default BlogForm
