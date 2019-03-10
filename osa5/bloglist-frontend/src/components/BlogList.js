import React from 'react'
import { connect } from 'react-redux'

import blogService from '../services/blogs'

import { like, remove } from '../reducers/blogsReducer'
import { updateNotification } from '../reducers/notificationReducer'


const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const BlogList = (props) => {
  const blogs = props.blogs
  const user = props.user

  const handleLike = async (blog) => {
    const newObject = { ...blog, 'user': blog.user.id, 'likes': blog.likes + 1 }
    const id = newObject.id
    delete newObject._id
    const updated = await blogService.update(id, newObject)

    props.like(updated)

    const msg = `you have liked '${updated.title}'`
    props.updateNotification(msg, 2)
  }

  const removeBlog = async (toBeRemoved) => {
    console.log('remove blog', toBeRemoved)

    if (window.confirm(`remove blog ${toBeRemoved.title} by ${toBeRemoved.author}?`)) {
      const resp = await blogService.remove(toBeRemoved.id)
      console.log('blog successfully removed, response.body:', resp.body)
      props.remove(toBeRemoved)
    }
  }

  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <div key={blog.id} style={blogStyle}>
            <div //onClick={toggleVisibility}
              className='blogOverview'>
              {blog.title} {blog.author}

              <div //style={showWhenVisible}
                className='blogDetails'>
                <a href={blog.url}>{blog.url}</a> <br></br>
                {blog.likes} likes
                <button onClick={() => handleLike(blog)}>
                  Like
                </button> <br></br>

                added by {blog.user.name} <br />

                {user.username === blog.user.username ?
                  <button onClick={() => removeBlog(blog)}>
                    remove
                  </button>
                  : ''
                }
              </div>
            </div>
          </div>
        )}

    </div>
  )
}

const filterBlogs = ({ blogs, filter }) => {
  return blogs
    .sort((a, b) => b.likes - a.likes)
  // .filter(blog => blog.content.toUpperCase().includes(filter[0].toUpperCase()))
}

const mapStateToProps = (state) => {
  console.log('BlogList state to props, state:', state)
  return {
    blogs: filterBlogs(state),
    user: state.user
  }
}

export default connect(mapStateToProps, { like, remove, updateNotification })(BlogList)