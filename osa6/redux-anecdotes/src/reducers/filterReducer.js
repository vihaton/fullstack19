const initialState = [""]

const filterReducer = (state = initialState, action) => {
  console.log('filter reducer: state now ', state)
  console.log('action', action)

  switch (action.type) {
    case 'UPDATE_F':
      return [action.data] //assumes that there is only one content
    default: {
      console.log('filter use default reaction')
      return state
    }
  }
}

export const updateFilter = (content) => {
  console.log('action creator for filter update', content)
  return {
    type: 'UPDATE_F',
    data: content
  }
}

export default filterReducer