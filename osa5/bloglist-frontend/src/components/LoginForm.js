import React from 'react'
import { connect } from 'react-redux'
import { login } from '../reducers/userReducer'
import { updateNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'


const LoginForm = (props) => {
  console.log('props @ LoginForm', props)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: props.username,
        password: props.password
      })

      props.login(user)

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      props.updateNotification(`logged in as ${user.name}`, 3)
      // props.username.reset()
      // props.password.reset()
    } catch (exception) {
      props.updateNotification('ERROR käyttäjätunnus tai salasana virheellinen', 5)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <h2>Log in to application</h2>
        käyttäjätunnus
        <input {...props.username} />
      </div>
      <div>
        salasana
        <input {...props.password} />
      </div>
      <button type='submit'>kirjaudu</button>
    </form>
  )
}

export default connect(null, { login, updateNotification })(LoginForm)