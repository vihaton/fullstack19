import React, { Component } from 'react';

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

export default Course;
