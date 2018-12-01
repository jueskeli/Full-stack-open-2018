import anecdoteService from '../services/anecdotes'

export const createAnecdote = (data, author) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(data, author)
    dispatch({
      type: 'CREATE',
      content: newAnecdote.content,
      id: newAnecdote.id,
      votes: newAnecdote.votes,
      author: newAnecdote.author
    })
  }
}

export const vote = (content) => {
  return async (dispatch) => {
    const updated = await anecdoteService.update(content.id, content)
    dispatch ({
      type: 'VOTE',
      content: updated.content,
      id: updated.id,
      votes: updated.votes,
      author: updated.author
    })
  }
}

export const msg = (content, time) => {
  return async (dispatch) => {
    dispatch ({
      type: 'MESSAGE',
      message: content
    })
    setTimeout(() => {
      dispatch ({
        type: 'CLEAR'
      })
    }, time * 1000)
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

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: anecdotes
    })
  }
}

export const anecdoteReducer = (store = [], action) => {
  console.log(store)
  console.log(action)
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)

    return [...old, { content: action.content, votes: action.votes, id: action.id, author: action.author } ]
  }
  if (action.type === 'CREATE') {

    return [...store, { content: action.content, votes: action.votes, id: action.id, author: action.author }]
  }
  if (action.type === 'INIT_NOTES'){
    return action.data
  }
  return store
}

export const notificationReducer = (state = '', action) => {
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