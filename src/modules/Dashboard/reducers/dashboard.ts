import produce from 'immer'
import DashboardService from 'modules/Dashboard/api/DashboardService'
import {
  InitialDashboardState,
  DasboardActionTypes,
} from 'modules/Dashboard/types'
import { SESSION_IS_EXPIRED } from 'modules/Auth/reducers/auth'

export const DASHBOARD_GET_SUMMARY = 'DASHBOARD_GET_SUMMARY'

export const getSummary = (): DasboardActionTypes => ({
  type: DASHBOARD_GET_SUMMARY,
  apiCall: () => DashboardService.getSummary(),
})

export const initialState = {
  summary: {},
}

export default produce(
  (draft: InitialDashboardState, action: DasboardActionTypes) => {
    const { type, result = {} } = action
    switch (type) {
      case DASHBOARD_GET_SUMMARY:
        draft.summary = result
        break

      case SESSION_IS_EXPIRED:
        return initialState

      default:
        return draft
    }
  },
  initialState
)
