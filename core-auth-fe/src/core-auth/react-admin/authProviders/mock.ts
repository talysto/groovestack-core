import { AuthProviderFactoryType } from './index'

export const mockAuthProvider: AuthProviderFactoryType = async () => {
  return ({
    login: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    checkAuth:  () => Promise.resolve(),
    logout: () => Promise.resolve(),
    handleCallback: () => Promise.resolve(),
    getPermissions:  () => Promise.resolve(),
    register: () => Promise.resolve(),
  })
}
