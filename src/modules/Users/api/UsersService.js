import { BaseAPI } from 'api'

class UsersService extends BaseAPI {

  getUsers() {
    return this.call({
      method: 'GET',
      url: '/Data/ListUsers',
    })
  }

}

export default new UsersService()
