class SortUtils {
  sortAlphabet(key: string) {
    return (a: any, b: any) => {
      if (a[key] < b[key]) return -1
      if (a[key] > b[key]) return 1
      return 0
    }
  }
}

export default new SortUtils()
