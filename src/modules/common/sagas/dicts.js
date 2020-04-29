import { takeEvery } from 'redux-saga/effects'
import apiRequest from 'api/apiRequest'
import { DICTIONARIES_GET_NATIONALITIES, DICTIONARIES_GET_RANKS } from 'modules/common/reducers/dicts'

export default function* watcher() {
	yield [
		yield takeEvery(DICTIONARIES_GET_NATIONALITIES, apiRequest),
		yield takeEvery(DICTIONARIES_GET_RANKS, apiRequest),
	]
}
