import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import './index.css'

import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'

import { useField } from './hooks'

import { updateNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogsReducer'
import { checkForLogin, logout } from './reducers/userReducer'

const removeReset = state => {
  const { reset, ...cleanState } = state
  return (cleanState)
}

const App = (props) => {
  console.log('props @ app', props)
  const user = props.user

  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  useEffect(() => {
    props.initBlogs()
  }, [])

  useEffect(() => {
    props.checkForLogin()
  }, [])


  const handleLogout = (event) => {
    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      logout()
      window.location.reload()
    } catch (exception) {
      props.updateNotification('ERROR uloskirjautummisessa ongelmia', 5)
    }
  }

  return (
    <div className='app'>
      <Notification />

      <h2>Login</h2>

      <Togglable buttonLabel='login'>
        <LoginForm
          username={removeReset(username)} password={removeReset(password)} />
      </Togglable>

      <div>
        <h2>blogs</h2>

        {user.username ?
          <div className='blogs'>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>
              logout
            </button>

            <Togglable buttonLabel='new blog'>
              <BlogForm
                title={removeReset(title)}
                author={removeReset(author)}
                url={removeReset(url)} />
            </Togglable>

            <BlogList />
          </div>
          : ''
        }
      </div>

    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('App state to props, state:', state)
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { checkForLogin, initBlogs, updateNotification })(App)