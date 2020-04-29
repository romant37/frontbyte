import UsersService from 'modules/Users/api/UsersService'
import { SESSION_IS_EXPIRED } from 'modules/Auth/reducers/auth'

export const GET_USERS_LIST = 'GET_USERS_LIST'
export const GET_USER_DETAILS = 'GET_USER_DETAILS'
export const EDIT_USER_DETAILS = 'EDIT_USER_DETAILS'

export const getUsers = () => ({
  type: GET_USERS_LIST,
  apiRequest: () => UsersService.getUsers(),
})

export const getUserDetails = id => ({
  type: GET_USER_DETAILS,
  apiRequest: () => UsersService.getUserDetails(id),
})

export const editUser = data => ({
  type: EDIT_USER_DETAILS,
  apiRequest: () => UsersService.editUser(data),
})

export const initialState = {
  users: {},
  userDetails: {},
  userEdit: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_LIST:
      return {
        ...state,
        users: {
          ...action.payload,
          ...action.result,
        },
      }

    case GET_USER_DETAILS:
      return {
        ...state,
        userDetails: {
          ...action.payload,
          ...action.result,
        },
      }

    case EDIT_USER_DETAILS:
      return {
        ...state,
        userEdit: {
          ...action.payload,
          ...action.result,
        },
      }

    case SESSION_IS_EXPIRED:
      return { ...initialState }

    default:
      return state
  }
}
