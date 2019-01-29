import React, { useState } from 'react'

const Person = ({person}) => {
  console.log('luodaan henkilö', person)
  
  return <p>{person.name} {person.number}</p>
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '050123432'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addEntry = (event) => {
    event.preventDefault()
    console.log('nappia painettu', event.target)

    if (persons.map(p => p.name).includes(newName)) {
      window.alert(`${newName} on jo luettelossa`)
    } else {

      const entryObject = {
        name: newName,
        number: newNumber
      }
      
      setPersons(persons.concat(entryObject))
    }
    setNewName('')
    setNewNumber('')
  }
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
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
          numero: <input
            value={newNumber}
            onChange={handleNumberChange}
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