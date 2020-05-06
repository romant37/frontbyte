import { format } from 'date-fns'

class DateUtils {
  formatDate(date: Date | number) {
    return date ? format(new Date(date), 'MMM dd, yyyy') : date
  }
}

export default new DateUtils()
