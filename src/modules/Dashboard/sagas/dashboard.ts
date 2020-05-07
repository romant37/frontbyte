import { takeEvery } from 'redux-saga/effects'
import apiCall from 'api/apiCall'
import { DASHBOARD_GET_SUMMARY } from 'modules/Dashboard/reducers/dashboard'

export default function* watcher() {
  yield [yield takeEvery(DASHBOARD_GET_SUMMARY, apiCall)]
}
