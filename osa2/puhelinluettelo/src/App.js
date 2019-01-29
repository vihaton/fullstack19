import React, { useState } from 'react'

const Person = ({person}) => {
  console.log('luodaan henkilö', person)
  
  return <p>{person.name} {person.number}</p>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [ newFilter, setNewFilter] = useState('')

  const entriesToShow = persons.filter(p => p.name.toUpperCase().includes(newFilter.toUpperCase()))

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

  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const rows = () => entriesToShow.map(p =>
    <Person
      key={p.name}
      person={p}
    />
  )

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <div>
          rajaa näytettäviä: <input 
            value={newFilter}
            onChange={handleFilterChange}
            />
        </div>
      <h2>lisää uusi</h2>
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