import React, { useState, useEffect } from 'react'
import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 

const Notification = ({ message }) => {
  if (!message) {
    return null
  } else if (message[0] === "E") {
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}


const LoginForm = ({handleLogin, username, password, handNameChange, handPassChange}) => (
  <form onSubmit={handleLogin}>
    <div>
      <h2>Log in to application</h2>
      käyttäjätunnus
        <input
        type="text"
        value={username}
        name="Username"
        onChange={handNameChange}
      />
    </div>
    <div>
      salasana
        <input
        type="password"
        value={password}
        name="Password"
        onChange={handPassChange}
      />
    </div>
    <button type="submit">kirjaudu</button>
  </form>      
)


const BlogForm = ({addBlog, nTitle, nAuth, nUrl, handTitChange, handAuthChange, handUrlChange}) => (
  <form onSubmit={addBlog}>
  <div>
    title
    <input
      value={nTitle}
      onChange={handTitChange}
      />
    </div>
      
    <div>
    author
    <input
      value={nAuth}
      onChange={handAuthChange}
      />
    </div>
      
    <div>
    url
    <input
      value={nUrl}
      onChange={handUrlChange}
      />
    </div>
      
    <div>
    <button type="submit">create</button>
  </div>
  </form>  
)

const App = () => {
  const [blogs, setBlogs] = useState([])  
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
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

      console.log('logged in as user', user);
      

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('ERROR käyttäjätunnus tai salasana virheellinen')
    }
  }

  const handleLogout = (event) => {
    try {
      window.localStorage.removeItem('loggedNoteappUser')
      window.location.reload()
    } catch (exception) {
      notify('uloskirjautummisessa ongelmia');
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()

    // --- luodaan kokonaan uusi kirjaus ---
    console.log('create new entry for', newTitle);
    
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      const data = await blogService.create(blogObject)
      
      setBlogs(blogs.concat(data))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      notify(`a new blog ${data.title} by ${data.author} was added`)
      
    } catch (error) {
      console.log("error @ adding a new blog", error.response.data.error);
      notify(`ERROR: ${error.response.data.error}`)
    }
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }


  return (
    <div>
      <Notification message={notification} />

      {user === null ?
        <LoginForm handleLogin={handleLogin}
          username={username} password={password} 
          handNameChange={handleUsernameChange} 
          handPassChange={handlePasswordChange}/>
        :
        <div>

          <h2>blogs</h2>
          <p>{user.name} logged in</p>
    
          <BlogForm addBlog={addBlog}
            nTitle={newTitle}
            nAuth={newAuthor}
            nUrl={newUrl}
            handTitChange={handleTitleChange}
            handAuthChange={handleAuthorChange}
            handUrlChange={handleUrlChange} />
          
          
          <button onClick={handleLogout}>
            logout
          </button>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App