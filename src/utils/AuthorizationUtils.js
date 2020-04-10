import startsWith from 'lodash/startsWith'
import { history } from 'utils'

export const USER_AUTH = 'USER_AUTH'

const ANONYMOUS_API_METHODS = [
  '/Logon',
  '/Logout',
]

const PUBLIC_ROUTES = [
  '/login',
]

const FORBIDDEN_ROUTES_FOR_SIGNED_USER = [
  '/login',
]

class AuthorizationUtils {

  storeSession(session) {
    localStorage.setItem(USER_AUTH, JSON.stringify(session))
  }

  getAuth() {
    const authInfo = localStorage.getItem(USER_AUTH)
    if (authInfo) {
      return JSON.parse(localStorage.getItem(USER_AUTH))
    }
    return {}
  }

  getSessionToken() {
    const authInfo = this.getAuth()
    const { sessionId, sessionToken } = authInfo
    return sessionId || sessionToken
  }

  clearSession() {
    localStorage.removeItem(USER_AUTH)
  }

  isAnonymousApiMethod(url) {
    return ANONYMOUS_API_METHODS.some(path => path.includes(url))
  }

  isPublicRoute() {
    const { pathname } = history.location
    return PUBLIC_ROUTES.some(url => startsWith(pathname, url))
  }

  isForbidenRouteForSignedUser() {
    const { pathname } = history.location
    return FORBIDDEN_ROUTES_FOR_SIGNED_USER.some(path => path === pathname)
  }

}

export default new AuthorizationUtils()
