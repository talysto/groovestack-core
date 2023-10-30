import { AuthProvider } from 'react-admin'

type MockAuthProviderType = () => Promise<AuthProvider>

export const mockAuthProvider: MockAuthProviderType = async () => {
  return {
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
}
