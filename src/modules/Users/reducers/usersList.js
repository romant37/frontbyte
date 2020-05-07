import produce from 'immer'
import UsersService from 'modules/Users/api/UsersService'
import { SESSION_IS_EXPIRED } from 'modules/Auth/reducers/auth'

export const GET_USERS_LIST = 'GET_USERS_LIST'
export const GET_USER_DETAILS = 'GET_USER_DETAILS'
export const EDIT_USER_DETAILS = 'EDIT_USER_DETAILS'

export const getUsers = () => ({
  type: GET_USERS_LIST,
  apiCall: () => UsersService.getUsers(),
})

export const getUserDetails = id => ({
  type: GET_USER_DETAILS,
  apiCall: () => UsersService.getUserDetails(id),
})

export const editUser = data => ({
  type: EDIT_USER_DETAILS,
  apiCall: () => UsersService.editUser(data),
})

export const initialState = {
  users: {},
  userDetails: {},
  userEdit: {},
}

export default produce((draft, action) => {
  const { type, result = {} } = action
  switch (type) {
    case GET_USERS_LIST:
      draft.users = result
      break

    case GET_USER_DETAILS:
      draft.userDetails = result
      break

    case EDIT_USER_DETAILS:
      draft.userEdit = result
      break

    case SESSION_IS_EXPIRED:
      return initialState

    default:
      return draft
  }
}, initialState)
