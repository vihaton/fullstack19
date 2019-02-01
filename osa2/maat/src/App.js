import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Results from "./Results"

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

const App = () => {
  //--- states ---
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [showOne, setShowOne] = useState(null)
  const [apikey, setApikey] = useState(apikey)
  const [weather, setWeather] = useState({})

  const countriesToShow = countries.filter(c => c.name.toUpperCase().includes(newFilter.toUpperCase()))

  //weather info if we know which city to fetch it for...
  let city = ""
  if (countriesToShow.length === 1) {
    console.log('we are interested about (by filter):', countriesToShow[0].capital);
    city = countriesToShow[0].capital
  } else if (showOne != null) {
    console.log('we chose to see ', showOne.capital);
    city = showOne.capital
  } 
  
  //...and it's not fetched already
  if (city != "" && !weather[city]) {
    console.log('fetch weather data with apikey', apikey)
    axios
    .get(`https://api.apixu.com/v1/current.json?key=${apikey}&q=${city}`).then(response => {
      console.log(response);
      weather[city] = response.data
      setWeather(weather)
    })
  }
  //--- hooks ---

  //country data
  useEffect(() => {
    console.log('fetch country data')
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
        showOne={showOne}
        weather={weather} />
    </div>
  )
}

export default App;
