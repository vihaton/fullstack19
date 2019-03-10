
import React from 'react'
import { connect } from 'react-redux'

import blogService from '../services/blogs'
import { initBlogs } from '../reducers/blogsReducer'
import { updateNotification } from '../reducers/notificationReducer'

const BlogForm = (props) => {

  const addBlog = async (event) => {
    event.preventDefault()

    // --- luodaan kokonaan uusi kirjaus ---
    console.log('create new entry for', props.title.value)

    const blogObject = {
      title: props.title.value,
      author: props.author.value,
      url: props.url.value
    }

    console.log('new blog', blogObject)

    try {
      const data = await blogService.create(blogObject)

      //to fetch the user object that is attached to the new blog
      props.initBlogs()
     
      // title.reset()
      // author.reset()
      // url.reset()
      props.updateNotification(`a new blog ${data.title} by ${data.author} was added`, 5)

    } catch (error) {
      console.log('error @ adding a new blog', error.response.data.error)
      props.updateNotification(`ERROR: ${error.response.data.error}`, 5)
    }
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input {...props.title} />
      </div>

      <div>
        author
        <input {...props.author} />
      </div>

      <div>
        url
        <input {...props.url} />
      </div>

      <div>
        <button type='submit'>create</button>
      </div>
    </form>
  )
}

export default connect(null, { initBlogs, updateNotification })(BlogForm)