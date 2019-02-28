import React from 'react';
import {
  vote
} from '../reducers/anecdoteReducer'
import { updateNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState().anecdotes

  const handleVote = (anecdote) => {
    console.log('vote', anecdote.id)
    store.dispatch(
      vote(anecdote.id)
    )
    const msg = `you have voted '${anecdote.content}'`
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
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .filter(anecdote => anecdote.content.toUpperCase().includes(store.getState().filter[0].toUpperCase()))
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList