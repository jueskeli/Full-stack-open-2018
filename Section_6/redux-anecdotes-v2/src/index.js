import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import { anecdoteReducer, notificationReducer, filterReducer } from './reducers/anecdoteReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  message: notificationReducer,
  filter: filterReducer
})

const store = createStore(reducer)

console.log('STORE :', store.getState())

const render = () => {
  ReactDOM.render(
    <Provider store={store} >
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)