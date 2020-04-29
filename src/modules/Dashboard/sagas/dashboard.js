import { takeEvery } from 'redux-saga/effects'
import apiRequest from 'api/apiRequest'
import { DASHBOARD_GET_SUMMARY } from 'modules/Dashboard/reducers/dashboard'

export default function* watcher() {
	yield [
		yield takeEvery(DASHBOARD_GET_SUMMARY, apiRequest),
	]
}
