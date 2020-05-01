import { takeEvery } from 'redux-saga/effects'
import apiCall from 'api/apiCall'
import {
  GET_USERS_LIST,
  GET_USER_DETAILS,
  EDIT_USER_DETAILS,
} from 'modules/Users/reducers/usersList'

export default function* watcher() {
  yield [
    yield takeEvery(GET_USERS_LIST, apiCall),
    yield takeEvery(GET_USER_DETAILS, apiCall),
    yield takeEvery(EDIT_USER_DETAILS, apiCall),
  ]
}
