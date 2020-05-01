import DashboardService from 'modules/Dashboard/api/DashboardService'
import { SESSION_IS_EXPIRED } from 'modules/Auth/reducers/auth'

export const DASHBOARD_GET_SUMMARY = 'DASHBOARD_GET_SUMMARY'

export const getSummary = () => ({
  type: DASHBOARD_GET_SUMMARY,
  apiCall: () => DashboardService.getSummary(),
})

export const initialState = {
  summary: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_GET_SUMMARY:
      return {
        ...state,
        summary: {
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
