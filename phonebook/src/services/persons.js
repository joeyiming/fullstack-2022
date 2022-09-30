import axios from 'axios'
const apiUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(apiUrl)
}

const create = obj => {
  return axios.post(apiUrl, obj)
}

const update = (id, obj) => {
  return axios.put(`${apiUrl}/${id}`, obj)
}

const remove = (id) => {
  return axios.delete(`${apiUrl}/${id}`)
}

export default {
  getAll,
  create,
  update,
  remove
}