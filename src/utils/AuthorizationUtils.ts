export const OCEAN_SESSION_TOKEN_NAME = 'SG-Ocean-Session-Token'

class AuthorizationUtils {
  storeSession(token: string) {
    sessionStorage.setItem(OCEAN_SESSION_TOKEN_NAME, token)
  }

  getSessionToken() {
    return sessionStorage.getItem(OCEAN_SESSION_TOKEN_NAME)
  }

  clearSession() {
    sessionStorage.removeItem(OCEAN_SESSION_TOKEN_NAME)
  }
}

export default new AuthorizationUtils()
