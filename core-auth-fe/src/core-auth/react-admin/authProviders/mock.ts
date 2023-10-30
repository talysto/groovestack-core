import { AuthProvider } from 'react-admin'


export const mockAuthProvider: AuthProvider = {
  // authentication
  login: (params) => {
    return Promise.resolve()
  },
  checkError: (error) => Promise.resolve(),
  checkAuth: (params) => {
    return Promise.resolve()
  },
  logout: () => Promise.resolve(),
  // getIdentity: () => Promise.resolve(),
  handleCallback: () => Promise.resolve(),
  getPermissions: () => Promise.resolve([]),
}
