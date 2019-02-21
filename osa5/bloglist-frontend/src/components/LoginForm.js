import React from 'react'
import propTypes from 'prop-types'

const LoginForm = ( { handleLogin, username, password, handNameChange, handPassChange }) => (
  <form onSubmit={handleLogin}>
    <div>
      <h2>Log in to application</h2>
      käyttäjätunnus
      <input
        type='text'
        value={username}
        name='Username'
        onChange={handNameChange}
      />
    </div>
    <div>
      salasana
      <input
        type='password'
        value={password}
        name='Password'
        onChange={handPassChange}
      />
    </div>
    <button type='submit'>kirjaudu</button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: propTypes.func.isRequired,
  username: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
  handNameChange: propTypes.func.isRequired,
  handPassChange: propTypes.func.isRequired
}

export default LoginForm