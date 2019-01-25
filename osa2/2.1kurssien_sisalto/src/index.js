import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) => {
    console.log(name);
    
    return (
        <div>
            <h1>{name}</h1>
        </div>
    )
}

const Part = ({part}) => {
    console.log(part);
    
    return (
        <div>
            <p>
                {part.name} {part.exercises}
            </p>
        </div>
    )
}

const Content = ({parts}) => {
    console.log(parts);
    
    const rows = () => parts.map(p =>
        <Part key={p.id} part={p} />
    )

    return (
        <div>
            {rows()}
        </div>
    )
}

const Total = ({parts}) => {
    console.log(parts);
    
    const reducer = (s, p) => {
        console.log("at Total: ", s, p);
        return s + p.exercises
    }
  
    return (
        <div>
            <p>yhteensä {parts.reduce(reducer, 0)} tehtävää</p>
        </div>
    )
}

const Course = ({course}) => {
    console.log(course);
    
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const App = () => {
    const course = {
      name: 'Half Stack -sovelluskehitys',
      parts: [
        {
          name: 'Reactin perusteet',
          exercises: 10,
          id: 1
        },
        {
          name: 'Tiedonvälitys propseilla',
          exercises: 7,
          id: 2
        },
        {
            name: 'Komponenttien tila',
            exercises: 14,
            id: 3
        },
        {
            name: 'Redux',
            exercises: 7,
            id: 4
        }
      ]
    }
  
    return (
      <div>
        <Course course={course} />
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))