import React, { useState, useEffect } from 'react'
import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useField } from './hooks'

const Notification = ({ message }) => {
  if (!message) {
    return null
  } else if (message[0] === 'E') {
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState( [] )
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBlogAppUser')
    // console.log('loggedUserJSON', loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = msg => {
    setNotification(msg)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      console.log('logged in as user', user)

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      notify('ERROR käyttäjätunnus tai salasana virheellinen')
    }
  }

  const handleLogout = (event) => {
    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      window.location.reload()
    } catch (exception) {
      notify('ERROR uloskirjautummisessa ongelmia')
    }
  }

  const handleLike = async (blogToUpdate) => {
    const newObject = { ...blogToUpdate, 'user': blogToUpdate.user.id, 'likes':blogToUpdate.likes + 1 }
    const id = newObject.id
    delete newObject._id
    const updated = await blogService.update(id, newObject)
    console.log('updated blog', updated)
    setBlogs(blogs.map(blog =>
      blog.id !== updated.id ? blog : updated
    ))
  }

  const addBlog = async (event) => {
    event.preventDefault()

    // --- luodaan kokonaan uusi kirjaus ---
    console.log('create new entry for', title.value)

    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    console.log('new blog', blogObject)

    try {
      const data = await blogService.create(blogObject)

      //to fetch the user object that is attached to the new blog
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
      title.reset()
      author.reset()
      url.reset()
      notify(`a new blog ${data.title} by ${data.author} was added`)

    } catch (error) {
      console.log('error @ adding a new blog', error.response.data.error)
      notify(`ERROR: ${error.response.data.error}`)
    }
  }

  const removeBlog = async (toBeRemoved) => {
    console.log('remove blog', toBeRemoved)

    if (window.confirm(`remove blog ${toBeRemoved.title} by ${toBeRemoved.author}?`)) {
      const resp = await blogService.remove(toBeRemoved.id)
      console.log('blog successfully removed, response.body:', resp.body)
      setBlogs(blogs.filter(blog => blog.id !== toBeRemoved.id))
    }
  }

  return (
    <div className='app'>
      <Notification message={notification} />

      <h2>Login</h2>

      <Togglable buttonLabel='login'>
        <LoginForm handleLogin={handleLogin}
          username={username} password={password} />
      </Togglable>

      <div>
        <h2>blogs</h2>

        {user ?
          <div className='blogs'>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>
              logout
            </button>

            <Togglable buttonLabel='new blog'>
              <BlogForm addBlog={addBlog}
                title={title}
                author={author}
                url={url} />
            </Togglable>

            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog =>
                <Blog key={blog.id} blog={blog}
                  handleLike={handleLike} removeBlog={removeBlog}
                  user={user} />
              )}
          </div>
          : ''
        }
      </div>

    </div>
  )
}

export default App