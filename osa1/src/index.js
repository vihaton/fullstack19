import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <p>{props.names[0]} {props.exercises[0]}</p>
            <p>{props.names[1]} {props.exercises[1]}</p>
            <p>{props.names[2]} {props.exercises[2]}</p>
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>yhteensä {props.counts[0] + props.counts[1] + props.counts[2]} tehtävää</p>
        </div>
    )
}

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const part1 = 'Reactin perusteet'
  const exercises1 = 10
  const part2 = 'Tiedonvälitys propseilla'
  const exercises2 = 7
  const part3 = 'Komponenttien tila'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content names={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]} />
      <Total counts={[exercises1, exercises2, exercises3]} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))