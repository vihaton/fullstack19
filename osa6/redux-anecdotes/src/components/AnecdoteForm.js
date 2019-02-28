import React from 'react';
import { connect } from "react-redux";
import {
  createAnecdote
} from '../reducers/anecdoteReducer'
import { updateNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const addAnecdote = (event) => {
      event.preventDefault()
      props.dispatch(
        createAnecdote(event.target.anecdote.value)
      )
      const msg = `you have created anecdote: '${event.target.anecdote.value}'`
      event.target.anecdote.value = ''
      props.dispatch(
        updateNotification(msg)
      )
      setTimeout(() => {
        props.dispatch(
          updateNotification('')
        )
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

export default connect()(AnecdoteForm)