import produce from 'immer'
import AuthService from 'modules/Auth/api/AuthService'

export const SIGN_IN_USER = 'SIGN_IN_USER'
export const LOG_OUT_USER = 'LOG_OUT_USER'
export const KEEP_ALIVE = 'KEEP_ALIVE'
export const SESSION_IS_EXPIRED = 'SESSION_IS_EXPIRED'

export const login = params => ({
  type: SIGN_IN_USER,
  apiCall: () => AuthService.login(params),
})

export const logout = () => ({
  type: LOG_OUT_USER,
  apiCall: () => AuthService.logout(),
})

export const keepAlive = () => ({
  type: KEEP_ALIVE,
  apiCall: () => AuthService.keepAlive(),
})

export const sessionIsExpired = error => ({
  type: SESSION_IS_EXPIRED,
  payload: error,
})

export const initialState = {
  loggedIn: {},
}

export default produce((draft, action) => {
  const { type, result = {} } = action
  switch (type) {
    case SIGN_IN_USER:
      draft.loggedIn = result
      break

    case SESSION_IS_EXPIRED:
    case LOG_OUT_USER:
      return initialState

    default:
      return draft
  }
}, initialState)
