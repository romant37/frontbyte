import { actionType } from 'middlewares'
import { SessionExpiredType } from 'types'
import {
  initialState,
  KEEP_ALIVE,
  LOG_OUT_USER,
  SIGN_IN_USER,
} from '../reducers/auth'

export type ActionsType =
  | LoginType
  | LogoutType
  | KeepAliveType
  | SessionExpiredType

export type LoginParamsType = {
  Company: string
  User: string
  Password: string
}
export type LoginPayloadType = {
  Token: string | null
}
type LoginType = actionType<
  typeof SIGN_IN_USER,
  LoginPayloadType,
  LoginParamsType
>

type LogoutType = actionType<typeof LOG_OUT_USER>

type KeepAliveType = actionType<typeof KEEP_ALIVE>

export type InitialStateType = typeof initialState
