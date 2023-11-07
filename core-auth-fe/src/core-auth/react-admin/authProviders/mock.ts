import { AuthProviderFactoryType } from './index'

// params to take inc redentials
// export const mockAuthProvider: AuthProviderFactoryType = ({ credentials }) => ({
//   // authentication
//   login: async (params) => {
//     const currentUser = await credentials.hydrateCurrentResource()
//     credentials.setCurrentResource(currentUser)
  
//     return
//   },
//   checkError: (error) => Promise.resolve(),
//   checkAuth: async (params) => {
//     return credentials.getCurrentResource()
//   },
//   logout: async () => credentials.removeCurrentResource(),
//   getIdentity: async () => credentials.getCurrentResource(),
//   handleCallback: () => Promise.resolve(),
//   getPermissions: () => Promise.resolve([]),
// })


export const mockAuthProvider = async ({ credentials }: { credentials: any }) => {
  // const currentUser: any = data.User[0]
  // currentUser.fullName = currentUser.name

  
  return {
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
    getIdentity: () => credentials.getCurrentResource(),
    handleCallback: () => Promise.resolve(), // for 3rd-party auth only
    getPermissions: () => Promise.resolve(['admin']),
  }
}
