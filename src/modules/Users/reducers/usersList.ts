import UsersService from 'modules/Users/api/UsersService'
import { SESSION_IS_EXPIRED } from 'types'
import {
  ActionsType,
  EditUserParamsType,
  InitialStateType,
  UserDetailsPayloadType,
} from '../types'
import { DefaultPayloadType } from 'middlewares'

export const GET_USERS_LIST = 'GET_USERS_LIST'
export const GET_USER_DETAILS = 'GET_USER_DETAILS'
export const EDIT_USER_DETAILS = 'EDIT_USER_DETAILS'

export const getUsers = (): ActionsType => ({
  type: GET_USERS_LIST,
  apiCall: () => UsersService.getUsers(),
})

export const getUserDetails = (id: number): ActionsType => ({
  type: GET_USER_DETAILS,
  apiCall: () => UsersService.getUserDetails(id),
})

export const editUser = (params: EditUserParamsType): ActionsType => ({
  type: EDIT_USER_DETAILS,
  apiCall: () => UsersService.editUser(params),
})

export const initialState = {
  users: {} as (UserDetailsPayloadType[] & DefaultPayloadType) | {},
  userDetails: {} as (UserDetailsPayloadType & DefaultPayloadType) | {},
  userEdit: {} as DefaultPayloadType | {},
}

export default (
  state = initialState,
  action: ActionsType
): InitialStateType => {
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
