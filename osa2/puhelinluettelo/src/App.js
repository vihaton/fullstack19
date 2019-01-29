import React, { useState } from 'react'

const Person = ({person}) => {
  console.log('luodaan henkilö', person)
  
  return <p>{person.name} {person.number}</p>
}

const Filter = (props) => {
  console.log('render filter', props);

  return (
    <div>
    rajaa näytettäviä: <input 
      value={props.nf}
      onChange={props.hfc}
      />
  </div>
  )
}

const PersonForm = (props) => {
  console.log('personform, lets render', props);

  return (
    <form onSubmit={props.ae}>
    <div>
      nimi: <input 
        value={props.nn}
        onChange={props.hnamec}
        />
    </div>
    <div>
      numero: <input
        value={props.nnum}
        onChange={props.hnumc}
        />
    </div>
    <div>
      <button type="submit">lisää</button>
    </div>
  </form>
  )
  
}

const Persons = ({toShow}) => {
  console.log('lets render persoooooons', toShow);
  const rows = () => toShow.map(p =>
    <Person
      key={p.name}
      person={p}
    />
  )

  return (
    <div>{rows()}</div>
  )
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

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter nf={newFilter}
        hfc={handleFilterChange} />
      <h2>lisää uusi</h2>
      <PersonForm ae={addEntry} 
        nn={newName}
        hnamec={handleNameChange}
        nnum={newNumber}
        hnumc={handleNumberChange}/>
      <h2>Numerot</h2>
      <Persons toShow={entriesToShow} />
    </div>
  )

}

export default App