import { AuthProvider } from 'react-admin'

type LoginCredentials = { email: string; password: string }

interface GenerateFetchClientProps {
  body?: string
  headers?: { [key: string]: string }
  method: string
  path: string
  baseUrl?: string
}

export const generateFetchRequest = ({
  body,
  headers = {},
  method,
  path,
  baseUrl = window.location.host,
}: GenerateFetchClientProps): Request => {
  const requestArgs: { method: string; headers: Headers; body?: string } = {
    method: method,
    headers: new Headers(
      Object.assign(
        {
          'Content-Type': 'application/json',
        },
        headers,
      ),
    ),
  }

  if (body) requestArgs.body = body

  const request = new Request(`https://${baseUrl}/${path}`, requestArgs)

  return request
}

export type Credentials = {
  getCurrentResource: () => any
  removeCurrentResource: () => void
  setCurrentResource: (resource: any) => any // often done in hydrateCurrentResource method
  hydrateCurrentResource?: () => Promise<any>
}

type LiveAuthProviderFactoryType = (params: { resource: string, credentials: Credentials, requiredRole?: string }) => AuthProvider

// NOTE this is a simple auth provider that has expectations about the auth server
// this can be completely overridden when passed to the Admin component. This is
// simply a starter kit
export const liveAuthProviderFactory: LiveAuthProviderFactoryType = ({ credentials, resource, requiredRole }) => {
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
      const request = generateFetchRequest({
        body: JSON.stringify({
          user: { email, password },
        }),
        method: 'POST',
        path: `${resource}/login.json`,
      })

      let response, data
      try {
        response = await fetch(request)
        data = await response.json()
      } catch (e) {
        console.error(e)
        throw new Error('Network error')
      }

      if (response.status != 200) {
        console.error(data)
        throw new Error(data[0]?.message)
      }

      if (credentials.hydrateCurrentResource) await credentials.hydrateCurrentResource()

      return data
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

      if (!currentResource || (requiredRole && !currentResource?.roles.includes(requiredRole))){
        if (requiredRole) throw new Error(
          `You must have an ‘${requiredRole}’ role to access these resources`,
        )
        else throw new Error('You must be logged in to access these resources')
      }

      return
    },
    logout: async () => {
      credentials.removeCurrentResource()

      const request = generateFetchRequest({
        method: 'DELETE',
        path: `${resource}/logout.json`,
      })

      const response = await fetch(request)
      if (response.status != 204 && response.status != 200) {
        throw new Error('Error logging out')
      }

      return
    },
    getIdentity,
    getPermissions: async () => {
      const currentResource = await getIdentity()

      return currentResource?.['roles']
    },
  }
}
