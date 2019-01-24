import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text}) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Display = ({text, value, after}) => (
    <div>
        {text} {value} {after}
    </div>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    let [votes, setVotes] = useState(0)
    const count = props.anecdotes.length
    if (votes === 0) { //inits only once
        console.log("init votes")
        votes = new Uint8Array(count)
    }
    console.log(votes)

    const nextRnd = () => Math.floor(Math.random() * count)
    const vote = (ind) => {
        console.log("voted ", ind)
        let c = [...votes]
        c[ind] += 1
        setVotes(c)
        setSelected(nextRnd())
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{props.anecdotes[selected]}</p>
            <Display text="has " value={0} after="votes" />
            <Button handleClick={() => vote(selected)} text="vote" />
            <Button handleClick={() => setSelected(nextRnd())} text="next anecdote" />
            <h1>Anecdote with the most votes</h1>
            <p>{props.anecdotes[votes.indexOf(Math.max(...votes))]}</p>
        </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)