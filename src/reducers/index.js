import { combineReducers } from 'redux'
import auth from 'modules/Auth/reducers/auth'
import dashboard from 'modules/Dashboard/reducers/dashboard'

const reducers = combineReducers({
  auth,
  dashboard,
})

export default reducers
