import fakeDataProvider from 'ra-data-fakerest'

import { AuthProvider } from 'react-admin'

import data from '../../dev-data.json'
// import { data } from './data'

export const mockDataProvider = fakeDataProvider(data, true)

type MockAuthProviderType = () => Promise<AuthProvider>

export const mockAuthProvider: MockAuthProviderType = async () => {
  const currentUser = data.User[0]
  currentUser.fullName = currentUser.name

  return {
    // authentication
    login: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    getIdentity: () => Promise.resolve(currentUser),
    handleCallback: () => Promise.resolve(), // for 3rd-party auth only
    getPermissions: () => Promise.resolve(['admin']),
  }
}
