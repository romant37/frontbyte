import { fork, all } from 'redux-saga/effects'
import dashboardSagas from 'modules/Dashboard/sagas/dashboard'

export default function *rootSaga() {
	yield all([
		fork(dashboardSagas),
	])
}
