import { fork, all } from 'redux-saga/effects'
import dictsSagas from 'modules/common/sagas/dicts'
import authSagas from 'modules/Auth/sagas/auth'
import dashboardSagas from 'modules/Dashboard/sagas/dashboard'
import usersSagas from 'modules/Users/sagas/usersList'

export default function* rootSaga() {
  yield all([
    fork(dictsSagas),
    fork(authSagas),
    fork(dashboardSagas),
    fork(usersSagas),
  ])
}
