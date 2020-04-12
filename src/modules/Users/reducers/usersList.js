import UsersService from 'modules/Users/api/UsersService'
import { SESSION_IS_EXPIRED } from 'modules/Auth/reducers/auth'

export const GET_USERS_LIST = 'GET_USERS_LIST'
export const GET_USER_DETAILS = 'GET_USER_DETAILS'

export const getUsers = () => ({
  apiCall: () => UsersService.getUsers(),
  type: GET_USERS_LIST
})

export const getUserDetails = id => ({
  apiCall: () => UsersService.getUserDetails(id),
  type: GET_USER_DETAILS
})

export const initialState = {
  users: {},
  userDetails: {},
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

    case SESSION_IS_EXPIRED:
      return { ...initialState }

    default:
      return state
  }
}
