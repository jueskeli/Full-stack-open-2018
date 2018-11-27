import React from 'react'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
    return (
      <div>
        <h2>Kirjaudu sisään</h2>
        <form onSubmit={handleSubmit}>
          <h3>
            Käyttäjätunnus:
            <input
              name='username'
              value={username}
              onChange={handleChange}
            />
          </h3>
          <h3>
            Salasana:
            <input
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
            />
          </h3>
          <button type='submit'>Kirjaudu sisään</button>
        </form>
      </div>
    )
}

export default LoginForm