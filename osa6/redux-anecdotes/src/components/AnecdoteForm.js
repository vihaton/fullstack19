import React from 'react';
import {
  createAnecdote
} from '../reducers/anecdoteReducer'
import { updateNotification } from "../reducers/notificationReducer";

const AnecdoteForm = ({store}) => {
  const addAnecdote = (event) => {
      event.preventDefault()
      store.dispatch(
        createAnecdote(event.target.anecdote.value)
      )
      const msg = `you have created anecdote: '${event.target.anecdote.value}'`
      event.target.anecdote.value = ''
      store.dispatch(
        updateNotification(msg)
      )
      setTimeout(() => {
        if (store.getState().notifications[0].content === msg) {
          console.log('timeout after 5s')
          store.dispatch(
            updateNotification('')
          )
        } else {
          console.log('the notification had already changed')
        }
      }, 5000)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm