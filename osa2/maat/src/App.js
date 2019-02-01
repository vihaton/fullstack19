import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { POINT_CONVERSION_COMPRESSED } from 'constants';

//https://restcountries.eu/rest/v2/all

const Filter = (props) => {
  console.log('render filter', props);

  return (
    <div>
    find countries
    <input 
      value={props.nf}
      onChange={props.hfc}
      />
  </div>
  )
}

const Result = ({c}) => {
  console.log('one result', c);
  return <p>{c.name}</p>
  
}

const Country = ({c}) => {
  console.log('Show the country', c);

  debugger
  const langs = () => c.languages.map(l => <li key={l.id}>{l.name}</li>)

  return (
    <div>
      <h1>{c.name}</h1>
      capital {c.capital} <br/>
      population {c.population}
      <h2>languages</h2>
      <ul>
        {langs()}
      </ul>
      <img src={c.flag} style={{
        flex: 1,
        width: 250,
        height: null,
        resizeMode: 'contain' }}/>
    </div>
  )
}

const Results = (props) => {
  console.log('update results', props);
  if (props.c.length > 10) {
    return <div>Too many matches, specify another filter PLEASE</div>
  } else if (props.c.length == 1) {
    return <Country c={props.c[0]} />
  }

  const rows = () => 
    props.c.map(c => 
      <Result key={c.name}
      c={c} />
    )

  return (
    <div>
      {rows()}
    </div>
  )
  
}

const App = () => {
  //--- states ---
  const [countries, setCountries] = useState([])
  const [ newFilter, setNewFilter] = useState('')

  const countriesToShow = countries.filter(c => c.name.toUpperCase().includes(newFilter.toUpperCase()))

  //--- hooks ---
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => {
      //.get('http://localhost:3001/countries').then(response => {
        console.log('promise fulfilled')
        console.log(response);
        setCountries(response.data)
      })
  }, [])


  //--- event handlers ---
  const handleFilterChange = (event) => setNewFilter(event.target.value)


  return (
    <div>
      <h2>Countries</h2>
      <Filter nf={newFilter}
        hfc={handleFilterChange} />
      <Results c={countriesToShow} />
    </div>
  )
}

export default App;
