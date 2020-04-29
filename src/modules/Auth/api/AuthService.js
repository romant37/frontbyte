import { BaseAPI } from 'api'
import { AuthorizationUtils } from 'utils'

class AuthService extends BaseAPI {
  login(data) {
    return this.call({
      method: 'POST',
      url: '/Session/Logon',
      data,
    })
  }

  logout() {
    const token = AuthorizationUtils.getSessionToken()
    return this.call({
      method: 'DELETE',
      url: `/Session/Logout/${token}`,
    })
  }

  keepAlive() {
    const token = AuthorizationUtils.getSessionToken()
    return this.call({
      method: 'PUT',
      url: `/Session/KeepAlive/${token}`,
    })
  }
}

export default new AuthService()
