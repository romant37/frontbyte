import { AuthorizationUtils } from 'utils'
import AuthService from 'modules/Auth/api/AuthService'

export const SIGN_IN_USER = 'SIGN_IN_USER'
export const LOG_OUT_USER = 'LOG_OUT_USER'
export const SESSION_IS_EXPIRED = 'SESSION_IS_EXPIRED'

export const login = params => dispatch => {
  dispatch({
    apiCall: () => AuthService.login(params),
    type: SIGN_IN_USER,
  })
  .then(response => {
    const { Token } = response || {}
    if (Token) {
      AuthorizationUtils.storeSession(Token)
    }
  })
}

export const logout = () => dispatch => {
  dispatch({ apiCall: () => AuthService.logout(), type: LOG_OUT_USER })
  dispatch(sessionIsExpired('Session expired'))
  AuthorizationUtils.redirectToLoginForm()
}

export const sessionIsExpired = error => ({
  error,
  type: SESSION_IS_EXPIRED,
})

export const initialState = {
  loggedIn: {},
}


export default (state = initialState, action) => {
  switch (action.type) {

    case SIGN_IN_USER:
      return {
        ...state,
        loggedIn: {
          ...action.payload.data,
          ...action.result,
        },
      }

    case SESSION_IS_EXPIRED:
    case LOG_OUT_USER:
      return { ...initialState }

    default:
      return state
  }
}
