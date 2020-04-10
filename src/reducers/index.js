import { combineReducers } from 'redux'
import auth from 'modules/Auth/reducers/auth'

const reducers = combineReducers({
  auth,
})

export default reducers
