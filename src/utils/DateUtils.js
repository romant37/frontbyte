import { format } from 'date-fns'

class DateUtils {

  formatDate(date) {
    return date ? format(date, 'MMM DD, YYYY') : date
  }

}

export default new DateUtils()
