import { takeEvery, put } from 'redux-saga/effects'
import { AuthorizationUtils } from 'utils'
import apiCall from 'api/apiCall'
import { sessionIsExpired } from 'modules/Auth/reducers/auth'
import {
  SIGN_IN_USER,
  LOG_OUT_USER,
  KEEP_ALIVE,
} from 'modules/Auth/reducers/auth'

function* login(action) {
  const response = yield* apiCall(action)
  const { Token } = response || {}
  if (Token) {
    AuthorizationUtils.storeSession(Token)
  }
}

function* logout(action) {
  try {
    yield* apiCall(action)
  } finally {
    if (!action.subtype) {
      yield put(sessionIsExpired('Session expired'))
      AuthorizationUtils.redirectToLoginForm()
    }
  }
}

export default function* watcher() {
  yield [
    yield takeEvery(KEEP_ALIVE, apiCall),
    yield takeEvery(LOG_OUT_USER, logout),
    yield takeEvery(SIGN_IN_USER, login),
  ]
}
