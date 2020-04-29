import { takeEvery, put } from 'redux-saga/effects'
import { AuthorizationUtils } from 'utils'
import apiRequest from 'api/apiRequest'
import { sessionIsExpired } from 'modules/Auth/reducers/auth'
import {
  SIGN_IN_USER,
  LOG_OUT_USER,
  KEEP_ALIVE,
} from 'modules/Auth/reducers/auth'

function* login(action) {
  const response = yield* apiRequest(action)
  const { Token } = response || {}
  if (Token) {
    AuthorizationUtils.storeSession(Token)
  }
}

function* logout(action) {
  try {
    yield* apiRequest(action)
  } finally {
    if (!action.subtype) {
      yield put(sessionIsExpired('Session expired'))
      AuthorizationUtils.redirectToLoginForm()
    }
  }
}

export default function* watcher() {
  yield [
    yield takeEvery(KEEP_ALIVE, apiRequest),
    yield takeEvery(LOG_OUT_USER, logout),
    yield takeEvery(SIGN_IN_USER, login),
  ]
}
