import axios from 'axios'
const baseUrl = '/api/persons'
//const baseUrl = 'http://localhost:3001/persons' //dev

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`)
  return req
}

export default { getAll, create, update, remove}