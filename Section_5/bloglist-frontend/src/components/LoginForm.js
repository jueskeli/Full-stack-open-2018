import React from 'react'
import { Form, Button } from 'semantic-ui-react'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
    return (
      <Form onSubmit={handleSubmit}>
        <h2>Kirjaudu sisään</h2>
          <Form.Field>
          <label>Käyttäjätunnus:</label>
            <input
              name='username'
              value={username}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
          <label>Salasana:</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
            />
          </Form.Field>
          <Button type='submit'>Kirjaudu sisään</Button>
        </Form>
    )
}

export default LoginForm