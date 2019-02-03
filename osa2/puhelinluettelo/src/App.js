import React, { useState, useEffect} from 'react'
import personService from "./services/persons"

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

const Person = ({person, re}) => {
  console.log('luodaan henkilö', person, re)
  
  return (
    <p>{person.name} {person.number}
      <button onClick={re}>
        poista
      </button>
    </p>
  )
}

const Persons = ({toShow, re}) => {
  console.log('lets render persoooooons', toShow);
  const rows = () => toShow.map(p =>
    <Person
      key={p.name}
      person={p}
      re={() => re(p)}
    />
  )

  return (
    <div>{rows()}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  const entriesToShow = persons.filter(p => p.name.toUpperCase().includes(newFilter.toUpperCase()))

  useEffect(() => {
    console.log('get all persons')
    personService
      .getAll()
      .then(data => {
        setPersons(data)
    })
  }, [])
  
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
      
      personService
        .create(entryObject)
        .then(data => {
          setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
      })      
    }
  }

  const removeEntry = (person) => {
    console.log('poistentaan entry nimeltä:', person.name);

    if (window.confirm(`Poistetaanko ${person.name}`)) {
      console.log('lets remove id', person.id);
      personService
        .remove(person.id)
        .then(promise => {
          console.log('remove succeeded, promise ', promise);
          setPersons(persons.filter(p => p.id !== person.id))
      })
    }
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
      <Persons toShow={entriesToShow}
        re={removeEntry} />
    </div>
  )

}

export default App