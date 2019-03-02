import React from 'react';
import { connect } from "react-redux";
import {
  createAnecdote
} from '../reducers/anecdoteReducer'
import { updateNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
      event.preventDefault()
      
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      props.createAnecdote(content)
  
      const msg = `you have created anecdote: '${content}'`
      props.updateNotification(msg)

      setTimeout(() => {
        props.updateNotification('')
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

export default connect(null, { createAnecdote, updateNotification })(AnecdoteForm)