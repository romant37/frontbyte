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

  editUser(data) {
    const { Id, ...rest } = data
    return this.call({
      method: 'PUT',
      url: `/Data/UpdateUser/${Id}`,
      data: { ...rest },
    })
  }
}

export default new UsersService()
