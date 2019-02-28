let timeout

const notificationAtStart = [
  "Let's init this thing"
]

const asObject = (notification) => {
  return {
    content: notification,
  }
}

const initialState = notificationAtStart.map(asObject)

const notificationReducer = (state = initialState, action) => {
  console.log('notification reducer: state now ', state)
  console.log('action', action)

  switch (action.type) {
    case 'UPDATE_N':
      return state.map(n => action.data) //assumes that there is only one content
    default: {
      console.log('use default reaction')
      return state
    }
  }
}

export const updateNotification = (content) => {
  console.log('action creator for notification update', content)
  return {
    type: 'UPDATE_N',
    data: {
      content
    }
  }
}

export default notificationReducer