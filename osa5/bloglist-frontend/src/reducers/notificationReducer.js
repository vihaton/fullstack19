const notificationAtStart = [
  ''
]

const asObject = (notification) => {
  return {
    content: notification,
  }
}

const initialState = notificationAtStart.map(asObject)

const notificationReducer = (state = initialState, action) => {
  console.log('notification reducer: state now ', state, '\n\taction', action)

  switch (action.type) {
  case 'UPDATE_N':
    return state.map(n => action.data) //assumes that there is only one content
  default: {
    console.log('notification reducer use default reaction')
    return state
  }
  }
}

let timeoutID = ''

export const updateNotification = (content, timeout) => {
  console.log('notification reducer: content, timeout, timeoutID', content, timeout, timeoutID)
  if (timeoutID > 0) {
    console.log('clear timeout', timeoutID)
    clearTimeout(timeoutID)
  }
  return async dispatch => {
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'UPDATE_N',
        data: { content: '' }
      })
    }, timeout * 1000)
    dispatch({
      type: 'UPDATE_N',
      data: { content }
    })
  }
}

export default notificationReducer