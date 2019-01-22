import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.part.name} {props.part.exercises}
            </p>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part part={props.parts[0]} />
            <Part part={props.parts[1]} />
            <Part part={props.parts[2]} />
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
    const part1 = {
    name: 'Reactin perusteet',
    exercises: 10
    }
    const part2 = {
    name: 'Tiedonvälitys propseilla',
    exercises: 7
    }
    const part3 = {
    name: 'Komponenttien tila',
    exercises: 14
    }
  

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]}/>
      <Total counts={[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))