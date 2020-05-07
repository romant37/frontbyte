import { BaseAPI } from 'api'

class DashboardService extends BaseAPI {
  getSummary() {
    return this.call({
      method: 'GET',
      url: '/Data/GetSummary',
    })
  }
}

export default new DashboardService()
