import blogService from '../services/blogs'

const initState = {
  logged: '',
  users: []
}

const userReducer = (state = initState, action) => {
  console.log('userReducer, state', state, '\n\taction', action)
  switch (action.type) {
  case 'INIT_USERS':
    return { ... state, users: action.data }
  case 'USER_IN':
    return { ...state, logged: action.data }
  case 'USER_OUT':
    return { ...state, logged: '' }
  default:
    return state
  }
}


export const checkForLogin = () => {
  const loggedUserJSON = localStorage.getItem('loggedBlogAppUser')
  // console.log('loggedUserJSON', loggedUserJSON)
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    return async dispatch => {
      dispatch({
        type: 'USER_IN',
        data: user
      })
    }
  }
  return async dispatch => {
    dispatch({
      type: 'USER_OUT'
    })
  }
}

export const initUsers = (users) => {
  return async dispatch => {
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const login = (user) => {
  console.log('login @ userReducer', user)
  return async dispatch => {
    dispatch({
      type: 'USER_IN',
      data: user
    })
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({
      type: 'USER_OUT',
    })
  }
}
export default userReducer