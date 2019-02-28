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

    default: {
      console.log('use default reaction')
      return state
    }
  }
}

export default notificationReducer