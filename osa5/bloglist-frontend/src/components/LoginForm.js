import React from 'react'
import propTypes from 'prop-types'

const LoginForm = ( { handleLogin, username, password }) => (
  <form onSubmit={handleLogin}>
    <div>
      <h2>Log in to application</h2>
      käyttäjätunnus
      <input {...username}/>
    </div>
    <div>
      salasana
      <input {...password}/>
    </div>
    <button type='submit'>kirjaudu</button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: propTypes.func.isRequired,
  username: propTypes.object.isRequired,
  password: propTypes.object.isRequired
}

export default LoginForm