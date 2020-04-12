import UsersService from 'modules/Users/api/UsersService'
import { SESSION_IS_EXPIRED } from 'modules/Auth/reducers/auth'

export const GET_USERS_LIST = 'GET_USERS_LIST'

export const getUsers = () => ({
  apiCall: () => UsersService.getUsers(),
  type: GET_USERS_LIST
})

export const initialState = {
  users: {},
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

    case SESSION_IS_EXPIRED:
      return { ...initialState }

    default:
      return state
  }
}
