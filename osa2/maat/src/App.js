import React, { useState, useEffect } from 'react';
import axios from 'axios'

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

const Button = ({handleClick, c }) => {
  return (
      <button onClick={() => handleClick(c)}>
          show
      </button>
  )
}

const Result = ({c, handleClick}) => {
  console.log('one result', c);
  return (
    <div>
      <p>{c.name}
      <Button c={c} handleClick={handleClick}/>
      </p>
    </div>
  )
}

const Country = ({c}) => {
  console.log('Show the country', c);

  const langs = () => c.languages.map(l => <li key={l.name}>{l.name}</li>)

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
  } else if (props.c.length === 1) {
    return <Country c={props.c[0]} />
  } else if (props.showOne != null) {
    return <Country c={props.showOne} />
  }

  const rows = () => 
    props.c.map(c => 
      <Result key={c.name}
      c={c} handleClick={props.handleClick}/>
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
  const [newFilter, setNewFilter] = useState('')
  const [showOne, setShowOne] = useState(null)
  const [apikey, setApikey] = useState(apikey)

  const countriesToShow = countries.filter(c => c.name.toUpperCase().includes(newFilter.toUpperCase()))

  //--- hooks ---

  //country data
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

  //apikey
  useEffect(() => {
    console.log('fetch apikey')
    axios
      .get('http://localhost:3002/keys').then(response => {
        console.log('promise fulfilled')
        console.log(response);
        setApikey(response.data[0]["apixu"])
      })
  }, [])


  //--- event handlers ---
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setShowOne(null)
  }

  const handleClick = (country) => {
    console.log('button was clicked at ', country);
    
    setShowOne(country)
  }

  return (
    <div>
      <h2>Countries</h2>
      <Filter nf={newFilter}
        hfc={handleFilterChange} />
      
      <Results c={countriesToShow} 
        handleClick={(c) => handleClick(c)}
        showOne={showOne} />
    </div>
  )
}

export default App;
