import { actionType } from 'middlewares'
import { SessionExpiredType } from 'types'
import {
  initialState,
  GET_USERS_LIST,
  GET_USER_DETAILS,
  EDIT_USER_DETAILS,
} from '../reducers/usersList'

export type ActionsType =
  | GetUsersType
  | GetUserDetailsType
  | EditUserType
  | SessionExpiredType

type GetUsersType = actionType<typeof GET_USERS_LIST, UserDetailsPayloadType[]>

export type UserDetailsPayloadType = {
  id: string
} & EditUserParamsType

type GetUserDetailsType = actionType<
  typeof GET_USER_DETAILS,
  UserDetailsPayloadType
>

export type EditUserParamsType = {
  Firstname: string
  Surname: string
  DateOfBirth: string
  Nationality: number
  Rank: string
  Address: string
}
type EditUserType = actionType<typeof EDIT_USER_DETAILS>

export type InitialStateType = typeof initialState
