import { usePost } from 'api/apiHelpers'

export const login = async (param: any) => {
  return await usePost('Session/Authentication', param)
}
