
import React from 'react'

const BlogForm = ({ addBlog, title, author, url }) => (
  <form onSubmit={addBlog}>
    <div>
    title
      <input {...title}/>
    </div>

    <div>
    author
      <input {...author} />
    </div>

    <div>
    url
      <input {...url}/>
    </div>

    <div>
      <button type='submit'>create</button>
    </div>
  </form>
)

export default BlogForm