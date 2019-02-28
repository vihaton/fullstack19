import React from 'react';
import { connect } from 'react-redux'
import {
  vote
} from '../reducers/anecdoteReducer'
import { updateNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes

  const handleVote = (anecdote) => {
    console.log('vote', anecdote.id)
    props.dispatch(
      vote(anecdote.id)
    )
    const msg = `you have voted '${anecdote.content}'`
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
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .filter(anecdote => anecdote.content.toUpperCase().includes(props.filter[0].toUpperCase()))
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

const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  console.log('AnecdoteList state to props, state:', state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    notifications: state.notifications
  }
}

export default connect(mapStateToProps)(AnecdoteList)