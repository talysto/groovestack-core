import { gql } from '@apollo/client'
import { AuthProviderFactoryType } from './index'

type LoginCredentials = { email: string; password: string }

export const liveAuthProviderFactory: AuthProviderFactoryType = ({ credentials, resource, requiredRole, client }) => {
  const LOGIN_MUTATION = gql`
    mutation ${resource}Login($email: String!, $password: String!) {
      ${resource}Login(email: $email, password: $password) {
        authenticatable {
          id
          email
        }
        credentials {
          accessToken
          client
          expiry
          tokenType
          uid
        }
      }
    }
  `

  const LOGOUT_MUTATION = gql`
    mutation ${resource}Logout {
      ${resource}Logout {
        authenticatable {
          email
        }
      }
    }
`

  const getIdentity = async () => {
    let currentResource = credentials.getCurrentResource()
    if (currentResource || !credentials.hydrateCurrentResource) return currentResource

    try {
      currentResource = await credentials.hydrateCurrentResource()
    } catch (e) {
      console.error(e)
      return null
    }

    return currentResource
  }

  return {
    // send username and password to the auth server and get back credentials
    login: async ({
      email,
      password,
    }: LoginCredentials): Promise<void | any> => {
      try {
        const { data, errors } = await client.mutate({ mutation: LOGIN_MUTATION, variables: { email, password } })
        if (errors && errors.length > 0) throw new Error(errors[0].message)
        const { authenticatable: currentUser } = data[`${resource}Login`]
        const { accessToken, tokenType, uid, ...rest } = data[`${resource}Login`].credentials
        credentials.setAuthHeaders({ 'access-token': accessToken, 'token-type': tokenType, id: currentUser.id, ...rest })
        credentials.setCurrentResource(currentUser)

        if (credentials.hydrateCurrentResource) await credentials.hydrateCurrentResource()

        return data
      } catch(e: any) {
        console.error(e)
        throw new Error(e.message || 'Error logging in')
      }
    },
    // when the dataProvider returns an error, check if this is an authentication error
    checkError: async (error) => {
      // called when dataProvider returns an error
      // rejected promise automatically calls authProvider.logout()

      if (
        [401, 403].includes(error?.status) ||
        [401, 403].includes(error?.networkError?.statusCode)
      ) {
        throw new Error(
          `You must have an ‘${requiredRole}’ role to access these resources`,
        )
      }
      return
    },
    // when the user navigates, make sure that their credentials are still valid
    checkAuth: async (params) => {
      const currentResource = credentials.getCurrentResource()
      if (credentials.hydrateCurrentResource) await credentials.hydrateCurrentResource()

      if (!currentResource || (requiredRole && !currentResource?.roles.includes(requiredRole))){
        if (requiredRole) throw new Error(
          `You must have an ‘${requiredRole}’ role to access these resources`,
        )
        else throw new Error('You must be logged in to access these resources')
      }

      return
    },
    logout: async () => {
      try {
        const { data, errors } = await client.mutate({ mutation: LOGOUT_MUTATION })
        if (errors && errors.length > 0) throw new Error(errors[0].message)

      } catch(e: any) {
        console.error(e)
        if (e.message != "User was not found or was not logged in.") throw new Error(e.message || 'Error logging out')
      }

      credentials.removeCurrentResource()
      credentials.clearAuthHeaders()
      // client.resetStore() // https://www.apollographql.com/docs/react/networking/authentication/#reset-store-on-logout
      
      return
    },
    getIdentity,
    getPermissions: async () => {
      const currentResource = await getIdentity()

      return currentResource?.['roles']
    },
  }
}