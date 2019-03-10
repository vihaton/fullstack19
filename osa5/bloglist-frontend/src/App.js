import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, //Link, Redirect, withRouter
} from 'react-router-dom'

import './index.css'

import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Users from './components/Users'

import userService from './services/users'

import { useField } from './hooks'

import { updateNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogsReducer'
import { checkForLogin, logout, initUsers } from './reducers/userReducer'
import { Container } from 'semantic-ui-react'

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
    userService.getAll().then(users => props.initUsers(users))
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
    <Container>
      <Notification />

      <h2>Login</h2>

      <Togglable buttonLabel='login'>
        <LoginForm
          username={removeReset(username)} password={removeReset(password)} />
      </Togglable>

      <div>
        <h2>blogs</h2>

        {user.logged.username ?
          <div>

            <div className='blogs'>
              <p>{user.name} logged in</p>
              <button onClick={handleLogout}>
                logout
              </button>
            </div>

            <Router>
              <div>
                <Route exact path="/" render={() => {
                  return (
                    <div>
                      <Togglable buttonLabel='new blog'>
                        <BlogForm
                          title={removeReset(title)}
                          author={removeReset(author)}
                          url={removeReset(url)} />
                      </Togglable>

                      <BlogList />
                    </div>
                  )
                }} />
                <Route path='/users' render={() => <Users />} />

              </div>
            </Router>
          </div>
          : ''
        }
      </div>

    </Container>
  )
}

const mapStateToProps = (state) => {
  console.log('App state to props, state:', state)
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { checkForLogin, initBlogs, initUsers, updateNotification })(App)