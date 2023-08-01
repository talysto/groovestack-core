import fakeDataProvider from 'ra-data-fakerest'

import { AuthProvider } from 'react-admin'

import data from '../../dev-data.json'
// import { data } from './data'

export const mockDataProvider = fakeDataProvider(data, true)


type MockAuthProviderType = () => Promise<AuthProvider>

export const mockAuthProvider: MockAuthProviderType = async () => {

  const currentUser = data.User[0]

  return (
    {
      // authentication
      login: _params => {
        return Promise.resolve()
      },
      checkError: _error => Promise.resolve(),
      checkAuth: _params => {
        return Promise.resolve()
      },
      logout: () => Promise.resolve(),
      getIdentity: () => Promise.resolve(currentUser),
      handleCallback: () => Promise.resolve(), // for third-party authentication only
      // authorization
      getPermissions: () => Promise.resolve(['admin']),
    }
  )
}