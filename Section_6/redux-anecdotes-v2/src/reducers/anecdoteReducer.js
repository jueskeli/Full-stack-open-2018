const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const createAnecdote = (data) => {
  console.log(data)
  return {
    type: 'CREATE',
    content: data.content,
    id: data.id,
    votes: data.votes
  }
}

export const vote = (updated) => {
  console.log('Updated:', updated)
  return {
    type: 'VOTE',
    content: updated.content,
    id: updated.id,
    votes: updated.votes
  }
}

export const msg = (content) => {
  console.log(content)
  return {
    type: 'MESSAGE',
    message: content
  }
}


export const clear = () => {
  return {
    type: 'CLEAR'
  }
}

export const filter = (ifilter) => {
  return {
    type: 'FILTER',
    filter: ifilter
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT_NOTES',
    data
  }
}

export const anecdoteReducer = (store = [], action) => {
  console.log(store)
  console.log(action)
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)

    return [...old, { content: action.content, votes: action.votes, id: action.id } ]
  }
  if (action.type === 'CREATE') {

    return [...store, { content: action.content, votes: action.votes, id: action.id }]
  }
  if (action.type === 'INIT_NOTES'){
    return action.data
  }
  return store
}

export const notificationReducer = (state = 'initial', action) => {
  switch (action.type) {
  case 'MESSAGE':
    return action.message
  case 'CLEAR':
    return ''
  default:
    return state
  }
}

export const filterReducer = (state = '', action) => {
  switch (action.type) {
  case 'FILTER':
    return action.filter
  default:
    return state
  }
}


export default anecdoteReducer