import React from 'react';
import { connect } from 'react-redux'
import {
  vote
} from '../reducers/anecdoteReducer'
import { updateNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes

  const handleVote = (anecdote) => {
    props.vote(anecdote)

    const msg = `you have voted '${anecdote.content}'`
    props.updateNotification(msg)

    setTimeout(() => {
      props.updateNotification('')
    }, 5000)
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
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

const filterAnecdotes = ({ anecdotes, filter }) => {
  return anecdotes.sort((a, b) => b.votes - a.votes)
    .filter(anecdote => anecdote.content.toUpperCase().includes(filter[0].toUpperCase()))
}

const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  console.log('AnecdoteList state to props, state:', state)
  return {
    anecdotes: filterAnecdotes(state),
  }
}

export default connect(mapStateToProps, { vote, updateNotification})(AnecdoteList)