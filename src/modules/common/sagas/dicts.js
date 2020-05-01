import { takeEvery } from 'redux-saga/effects'
import apiCall from 'api/apiCall'
import {
  DICTIONARIES_GET_NATIONALITIES,
  DICTIONARIES_GET_RANKS,
} from 'modules/common/reducers/dicts'

export default function* watcher() {
  yield [
    yield takeEvery(DICTIONARIES_GET_NATIONALITIES, apiCall),
    yield takeEvery(DICTIONARIES_GET_RANKS, apiCall),
  ]
}
