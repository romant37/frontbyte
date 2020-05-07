import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import auth from 'modules/Auth/reducers/auth'
import { History } from 'history'

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth,
  })

export default createRootReducer
