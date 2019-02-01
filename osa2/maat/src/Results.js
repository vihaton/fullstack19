import React from 'react';


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
  
  const Country = ({c, weather}) => {
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
        <Weather w={weather} />
      </div>
    )
  }
  
  const Weather = ({w}) => {
    console.log('lets render weather', w);
    if (w) {
  
      return (
        <div>
        <h2>Weather in {w.location.name}</h2>
        <p><b>temperature:</b> {w.current.temp_c} Celsius</p>
        <img src={w.current.condition.icon} />
        <p><b>wind:</b> {w.current.wind_kph} kph direction {w.current.wind_dir}</p>
      </div>
      )
    }
    return <div>Weather info is loading...</div>
  }
  
  const Results = (props) => {
    console.log('update results', props);
    let thec = null
    if (props.c.length > 10) {
      return <div>Too many matches, specify another filter PLEASE</div>
    } else if (props.c.length === 1) {
      thec=props.c[0]
    } else if (props.showOne != null) {
      thec = props.showOne
    }
  
    if (thec) {
      return <Country c={thec} weather={props.weather[thec.capital]} />
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

  export default Results;
