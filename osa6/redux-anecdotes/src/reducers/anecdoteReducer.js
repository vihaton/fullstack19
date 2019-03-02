import anecdoteService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      return state.map(anecdote => {
        return anecdote.id === action.data.id ?
          action.data : anecdote
      })
    case 'NEW':
      return state.concat(asObject(action.data.content))
    case 'INIT_ANECDOTES':
      return action.data
    default: {
      console.log('use default reaction')
      return state
    }
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newDote = await anecdoteService.createNew(content)
    dispatch ({
      type: 'NEW',
      data: newDote
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch ({
      type: "INIT_ANECDOTES",
      data: anecdotes
    })
  } 
}


export const vote = (anecdote) => {
  return async dispatch => {
    const dote = {...anecdote, votes: anecdote.votes + 1}
    const updatedDote = await anecdoteService.update(dote)
    dispatch({
      type: 'VOTE',
      data: updatedDote
    })
  }
}

export default anecdoteReducer