import { combineReducers } from 'redux'
import auth from 'modules/Auth/reducers/auth'
import dicts from 'modules/common/reducers/dicts'
import dashboard from 'modules/Dashboard/reducers/dashboard'
import usersList from 'modules/Users/reducers/usersList'

const reducers = combineReducers({
  auth,
  dicts,
  dashboard,
  usersList,
})

export type AppStateType = ReturnType<typeof reducers>

export default reducers
