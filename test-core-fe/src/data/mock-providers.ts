import fakeDataProvider from 'ra-data-fakerest'

import { AuthProvider, localStorageStore } from 'react-admin'

import data from '../../dev-data.json'
// import { data } from './data'

export const mockDataProvider = fakeDataProvider(data, true)

type MockAuthProviderType = () => Promise<AuthProvider>

const store = localStorageStore()

const storeActions = {
  getCurrentResource: () => store.getItem('currentUser'),
  removeCurrentResource: () => store.removeItem('currentUser'),
  setCurrentResource: (resource: any) => store.setItem('currentUser', resource),
}

const hydrateCurrentUser = async () => {
  let currentUser = storeActions.getCurrentResource()

  // short circuit. current user already set
  if (currentUser) return currentUser

  // // fetch current user
  currentUser = data.User[0]
  currentUser.fullName = currentUser.name

  storeActions.setCurrentResource(currentUser)

  return currentUser
}

const credentials = {
  clearAuthHeaders: () => {},
  setAuthHeaders: () => {},
  getCurrentResource: storeActions.getCurrentResource,
  removeCurrentResource: storeActions.removeCurrentResource,
  setCurrentResource: storeActions.setCurrentResource,
  hydrateCurrentResource: hydrateCurrentUser
}

// login: async (params) => {
//   const currentUser = await credentials.hydrateCurrentResource()
//   credentials.setCurrentResource(currentUser)

//   return
// },
// checkError: (error) => Promise.resolve(),
// checkAuth: async (params) => {
//   return credentials.getCurrentResource()
// },
// logout: async () => credentials.removeCurrentResource(),
// getIdentity: async () => credentials.getCurrentResource(),
// handleCallback: () => Promise.resolve(),
// getPermissions: () => Promise.resolve([]),

export const mockAuthProvider: MockAuthProviderType = async () => {
  const currentUser: any = data.User[0]
  currentUser.fullName = currentUser.name

  return {
    // authentication
    login: async () => {
      const currentUser = await credentials.hydrateCurrentResource()
      credentials.setCurrentResource(currentUser)
    
      return
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
      if (credentials.getCurrentResource()) return Promise.resolve()
      else return Promise.reject()
    },
    logout: () => Promise.resolve(),
    getIdentity: () => Promise.resolve(currentUser),
    handleCallback: () => Promise.resolve(), // for 3rd-party auth only
    getPermissions: () => Promise.resolve(['admin']),
  }
}
