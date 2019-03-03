import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async content => {
  const anecdote = { content, votes:0 }
  console.log('new anecdote to be sent to the server', anecdote)
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const update = (newObject) => {
  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, createNew, update }