import blogsService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  console.log('blogsReducer, state', state, '\n\taction', action)

  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'ADD_BLOG':
    return state.concat(action.data)
  case 'UPDATE_BLOG':
    return state.map(blog => {
      return blog.id === action.data.id ?
        { ...blog, likes: action.data.likes }
        : blog
    })
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}


export const like = (blogToUpdate) => {
  console.log('like this blog', blogToUpdate)

  return async dispatch => {
    dispatch({
      type: 'UPDATE_BLOG',
      data: blogToUpdate
    })
  }
}



export const add = (toBeAdded) => {
  return async dispatch => {
    dispatch({
      type: 'ADD_BLOG',
      data: toBeAdded
    })
  }
}

export const remove = (toBeRemoved) => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE_BLOG',
      data: toBeRemoved
    })
  }
}

export default blogsReducer