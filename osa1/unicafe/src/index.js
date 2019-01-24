import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Display = ({text, value, after}) => (
    <div>{text} {value} {after}</div>
    )

const Statistics = ({good, neutral, bad}) => {
    const count=good + neutral + bad
    let ave=0
    let pos=0
    if (count > 0) {
      ave=(good - bad) / count
      pos=good / count
    }

    return (
        <div>
            <h1>statistiikka</h1>
            <Display text="hyvä" value={good}/>
            <Display text="neutraali" value={neutral}/>
            <Display text="huono" value={bad}/>
            <Display text="yhteensä" value={count}/>
            <Display text="keskiarvo" value={ave}/>
            <Display text="positiivisia" value={pos} after="%"/>
        </div>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
        <h1>anna palautetta</h1>
        <Button handleClick={() => setGood(good + 1)}
            text="hyvä"
        />
        <Button handleClick={() => setNeutral(neutral + 1)}
            text="neutraali"
        />
        <Button handleClick={() => setBad(bad + 1)}
            text="huono"
        />
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )

}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
