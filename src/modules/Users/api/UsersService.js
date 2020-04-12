import { BaseAPI } from 'api'

class UsersService extends BaseAPI {

  getUsers() {
    return this.call({
      method: 'GET',
      url: '/Data/ListUsers',
    })
  }

  getUserDetails(id) {
    return this.call({
      method: 'GET',
      url: `/Data/GetUser/${id}`,
    })
  }

}

export default new UsersService()
