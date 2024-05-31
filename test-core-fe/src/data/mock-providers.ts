import fakeDataProvider from 'ra-data-fakerest'
import { AuthProvider, localStorageStore } from 'react-admin'

import data from '../../dev-data.json'

export const mockDataProvider = fakeDataProvider(data, true)

type MockAuthProviderType = () => Promise<AuthProvider>

const store = localStorageStore()

// set default app config

export const defaultAppConfig = { 
  has_admins: true, 
  user_roles: ['admin'], 
  oauth_providers: { 
    enabled: [
      {k: 'google', path: 'users/auth/google'},
      {k: 'apple', path: 'users/auth/apple'},
    ],
    configured: [
      {k: 'google', path: 'users/auth/google'},
      {k: 'apple', path: 'users/auth/apple'},
    ]
  },
  auth_providers: { 
    enabled: [
      {k: 'google', path: 'users/auth/google'},
      {k: 'apple', path: 'users/auth/apple'},
      {k: 'email' }
    ],
    configured: [
      {k: 'google', path: 'users/auth/google'},
      {k: 'apple', path: 'users/auth/apple'},
      {k: 'email' }
    ]
  }
}

const storeActions = {
  getCurrentResource: () => store.getItem('currentUser'),
  clearCurrentResource: () => store.removeItem('currentUser'),
  setCurrentResource: (resource: any) => store.setItem('currentUser', resource),
  // use localstorage for app config so it persists beyond logout
  clearAppConfig: () => localStorage.removeItem('groovestackAppConfig'),
  getAppConfig: () => JSON.parse(localStorage.getItem('groovestackAppConfig') || ''),
  setAppConfig: (appConfig: {[k:string]: any}) => localStorage.setItem('groovestackAppConfig', JSON.stringify(appConfig)),
}

const hydrateCurrentUser = async () => {
  let currentUser = storeActions.getCurrentResource()

  // short circuit. current user already set
  if (currentUser) return currentUser

  // // fetch current user
  currentUser = data.User.find(u => u.roles.includes('admin'))
  currentUser.fullName = currentUser.name

  storeActions.setCurrentResource(currentUser)

  return currentUser
}

export const credentials = {
  ...storeActions,
  hydrateCurrentResource: hydrateCurrentUser
}

export const mockAuthProvider: MockAuthProviderType = async () => {
  return {
    // authentication
    login: async () => {
      const currentUser = await credentials.hydrateCurrentResource()
      credentials.setCurrentResource(currentUser)
    
      return
    },
    register: async() => {
      const currentUser = await credentials.hydrateCurrentResource()
      credentials.setCurrentResource(currentUser)
    
      return
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
      if (credentials.getCurrentResource()) return Promise.resolve()
      
      return Promise.reject()
    },
    logout: () => {
      credentials.clearCurrentResource()

      return Promise.resolve()
    },
    getIdentity: () => Promise.resolve(credentials.getCurrentResource()),
    handleCallback: () => Promise.resolve(), // for 3rd-party auth only
    getPermissions: () => Promise.resolve(['admin']),
  }
}
