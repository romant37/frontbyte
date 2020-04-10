import { BaseAPI } from 'api'

class AuthService extends BaseAPI {

  login({ company, account, password }) {
    return this.call({
      method: 'POST',
      url: '/Session/Logon',
      data: {
        company,
        account,
        password,
      },
    })
  }

  logout() {
    return this.call({
      method: 'DELETE',
      url: '/Session/Logout',
      data: {},
    })
  }

}

export default new AuthService()
