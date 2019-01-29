import React, { useState } from 'react'

const Person = ({person}) => {
  console.log('luodaan henkilö', person)
  
  return <p>{person.name}</p>
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addEntry = (event) => {
    event.preventDefault()
    console.log('nappia painettu', event.target)
    const entryObject = {
      name: newName
    }
  
    setPersons(persons.concat(entryObject))
    setNewName('')
  }
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const rows = () => persons.map(p =>
    <Person
      key={p.name}
      person={p}
    />
  )

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addEntry}>
        <div>
          nimi: <input 
            value={newName}
            onChange={handleNameChange}
            />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      {rows()}
    </div>
  )

}

export default App