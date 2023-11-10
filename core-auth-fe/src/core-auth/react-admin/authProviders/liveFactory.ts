import { gql } from '@apollo/client'
import { AuthProviderFactoryType } from './index'
import { defaultCredentials } from '../../credentials';
import { UserIdentity } from 'react-admin'

export type LoginCredentials = { email: string; password: string }
export type RegistrationCredentials = LoginCredentials & { name: string }

// NOTE this is a simple auth provider that has expectations about the auth server
// this can be completely overridden when passed to the Admin component. This is
// simply a starter kit

export const liveAuthProviderFactory: AuthProviderFactoryType = async ({ client, credentials=defaultCredentials, resource='user', requiredRole }) => {
  if (!(client && credentials && resource)) throw new Error('liveAuthProviderFactory is not fully implemented yet. client, credentials and resource args must be provided')

  const LOGIN_MUTATION = gql`
    mutation ${resource}_login($email: String!, $password: String!) {
      ${resource}_login(email: $email, password: $password) {
        authenticatable {
          id
          email
        }
        credentials {
          accessToken
          client
          expiry
          tokenType
        }
      }
    }
  `

  const LOGOUT_MUTATION = gql`
    mutation ${resource}_logout {
      ${resource}_logout {
        authenticatable {
          id
          email
        }
      }
    }
  `

  const REGISTRATION_MUTATION = gql`
    mutation ${resource}_register($email: String!, $password: String!, $passwordConfirmation: String!, $name: String!) {
      ${resource}_register(email: $email, password: $password, passwordConfirmation: $passwordConfirmation, name: $name) {
        authenticatable {
          id
          email
        }
        credentials {
          accessToken
          client
          expiry
          tokenType
        }
      }
    }
  `

  const getIdentity = async () => {
    let currentResource = credentials.getCurrentResource() as UserIdentity
    if (currentResource || !credentials.hydrateCurrentResource) return currentResource

    await credentials.hydrateCurrentResource(client)

    return credentials.getCurrentResource() as UserIdentity
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

        const { authenticatable: currentResource } = data[`${resource}_login`]
        const { accessToken, tokenType, ...rest } = data[`${resource}_login`].credentials
        credentials.setAuthHeaders({ 'access-token': accessToken, 'token-type': tokenType, id: currentResource.id, ...rest })

        if (credentials.hydrateCurrentResource) await credentials.hydrateCurrentResource(client)
        else credentials.setCurrentResource(currentResource)

        return data
      } catch(e: any) {
        console.error(e)
        throw new Error(e.message || 'Error logging in')
      }
    },
    register: async ({
      email,
      name,
      password,
    }: RegistrationCredentials) => {
      try {
        const { data, errors } = await client.mutate({ mutation: REGISTRATION_MUTATION, variables: { email, password, passwordConfirmation: password, name: name } })

        if (errors && errors.length > 0) throw new Error(errors[0].message)

        return data
      } catch(e: any) {
        throw new Error(e.message || 'Error registering')
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
    checkAuth: async () => {
      let currentResource = credentials.getCurrentResource()
      if (!currentResource && credentials.hydrateCurrentResource){
        await credentials.hydrateCurrentResource(client)
        currentResource = credentials.getCurrentResource()
      } 

      if (!currentResource) throw new Error('You must be logged in to access these resources')
      if (requiredRole && !currentResource?.roles.includes(requiredRole)) throw new Error(`You must have an ‘${requiredRole}’ role to access these resources`)

      return
    },
    logout: async () => {

      try {
        const { errors } = await client.mutate({ mutation: LOGOUT_MUTATION })
        if (errors && errors.length > 0) throw new Error(errors[0].message)

      } catch(e: any) {
        console.error(e)
        if (e.message != "User was not found or was not logged in.") throw new Error(e.message || 'Error logging out')
      }

      credentials.clearCurrentResource()
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