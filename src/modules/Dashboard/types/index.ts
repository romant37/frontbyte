import { ActionType } from 'types'
import { SessionExpiredAction } from 'modules/Auth/types'
import { initialState, DASHBOARD_GET_SUMMARY } from '../reducers/dashboard'

type GetSummaryAction = ActionType<typeof DASHBOARD_GET_SUMMARY>

export type DasboardActionTypes = GetSummaryAction | SessionExpiredAction

export type InitialDashboardState = typeof initialState
