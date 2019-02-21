import React, {useState} from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, handleLike, removeBlog, user}) => {

  const [visible, setVisible] = useState(false)
  
  // const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  
  const toggleVisibility = () => {
    // console.log('clicked');
    setVisible(!visible)
  }

  console.log('render blog', blog);
  
  return (
    <div style={blogStyle}>
      <div onClick={toggleVisibility}>
        {blog.title} {blog.author}

        <div style={showWhenVisible}>
          <a href={blog.url}>{blog.url}</a> <br></br>
          {blog.likes} likes 
          <button onClick={() => handleLike(blog)}>
            Like
          </button> <br></br>

          added by {blog.user.name} <br/>

          {user.username === blog.user.username ?
          <button onClick={() => removeBlog(blog)}>
          remove
          </button>
          : ""
          }
        </div>
      </div>
    </div> 
  )
}

export default Blog