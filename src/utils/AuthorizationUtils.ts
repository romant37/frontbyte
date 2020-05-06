import { history } from 'utils'

export const USER_AUTH = 'USER_AUTH'

const ANONYMOUS_API_METHODS = ['/Logon', '/Logout']

class AuthorizationUtils {
  storeSession(token: string) {
    localStorage.setItem(USER_AUTH, token)
  }

  getSessionToken() {
    return localStorage.getItem(USER_AUTH)
  }

  clearSession() {
    localStorage.removeItem(USER_AUTH)
  }

  redirectToLoginForm() {
    this.clearSession()
    history.push('/login')
  }

  redirectToHomePage() {
    const token = this.getSessionToken()
    if (token) {
      history.push('/dashboard')
    } else {
      this.redirectToLoginForm()
    }
  }

  checkSessionToken() {
    const token = this.getSessionToken()
    if (!token) {
      this.redirectToLoginForm()
    }
  }

  isAnonymousApiMethod(url: string | undefined) {
    if (!url) return false
    return ANONYMOUS_API_METHODS.some(path => path.includes(url))
  }
}

export default new AuthorizationUtils()
