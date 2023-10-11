import fakeDataProvider from 'ra-data-fakerest'
import data from './dev-data.json'

export const mockDataProvider = fakeDataProvider(data, true)

export const mockAuthProvider = async () => {
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