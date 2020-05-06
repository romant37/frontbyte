import { takeEvery } from 'redux-saga/effects'
import apiCall from 'api/apiCall'
import { DICTIONARIES_GET } from 'modules/common/reducers/dicts'

export default function* watcher() {
  yield [yield takeEvery(DICTIONARIES_GET, apiCall)]
}
