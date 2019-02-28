import React from 'react'
import { connect } from 'react-redux'
import { updateFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  console.log('props at filter', props)
  const handleChange = (event) => {
    props.dispatch(
      updateFilter(event.target.value)
    )
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect((state) => state)(Filter)