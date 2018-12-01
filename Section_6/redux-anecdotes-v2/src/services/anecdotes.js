import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content, author) => {
  const response = await axios.post(url, { content , votes: 0 , author })
  return response.data
}

const update = async (id, newAnec,) => {
  console.log(' PUT_ID:', id)
  console.log(' PUT:', newAnec)
  console.log(`${url}/${id}`)
  const response = await axios.put(`${url}/${id}`, newAnec)
  return response.data
}

export default { getAll, createNew, update }