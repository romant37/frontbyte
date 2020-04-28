import { call, put, takeEvery } from 'redux-saga/effects'
import { DASHBOARD_GET_SUMMARY } from 'modules/Dashboard/reducers/dashboard'

export const REQUEST_TYPE = '_STARTED'
export const SUCCESS_TYPE = '_SUCCESS'
export const FAILURE_TYPE = '_FAILURE'

// Helper API request function like apiMiddleware
// Request generator can be moved in utils
function* request(action) {

	const { type, subtype, apiRequest } = action

	if (subtype || !apiRequest) return null

	const requestType = `${type}${REQUEST_TYPE}`
	const successType = `${type}${SUCCESS_TYPE}`
	const failureType = `${type}${FAILURE_TYPE}`

	yield put({ type, subtype: requestType, payload: {} })

	try {
		 const { data } = yield call(apiRequest)
		 yield put({ type, subtype: successType, payload: { data } })
	} catch (e) {
		 yield put({ type, subtype: failureType, payload: e.message })
	}
}

export default function* watchDashboard() {
	yield [
		yield takeEvery(DASHBOARD_GET_SUMMARY, request),
	]
}
