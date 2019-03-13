import { createStore } from 'redux'

export const ACTIONS = {
    LOG_IN: 'LOG_IN'
}

function todos(state = {}, action) {
    switch (action.type) {
      case ACTIONS.LOG_IN:
        return {
            ...state,
            loggedIn: true
        }
      default:
        return state
    }
  }


const initialState = {
    loggedIn: false
}

export const store = createStore(todos, initialState)