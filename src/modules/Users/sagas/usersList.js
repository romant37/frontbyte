import { takeEvery } from 'redux-saga/effects'
import apiRequest from 'api/apiRequest'
import {
  GET_USERS_LIST,
  GET_USER_DETAILS,
  EDIT_USER_DETAILS,
} from 'modules/Users/reducers/usersList'

export default function* watcher() {
  yield [
    yield takeEvery(GET_USERS_LIST, apiRequest),
    yield takeEvery(GET_USER_DETAILS, apiRequest),
    yield takeEvery(EDIT_USER_DETAILS, apiRequest),
  ]
}
