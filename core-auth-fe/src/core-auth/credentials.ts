import { ApolloClient, NormalizedCacheObject, gql } from '@apollo/client'
import { localStorageStore } from 'react-admin'

export type Credentials = {
  clearCurrentResource: () => void
  getCurrentResource: () => {[k:string]: any}
  setCurrentResource: (r: {[k:string]: any}) => void // often done in hydrateCurrentResource method
  clearAuthHeaders: () => void;
  getAuthHeaders: () => {[k:string]: any};
  setAuthHeaders: (headers: {[k: string]: string}) => void
  clearAppConfig: () => void;
  getAppConfig: () => {[k:string]: any};
  setAppConfig: (appConfig: {[k:string]: any}) => void;
  hydrateCurrentResource?: (props: any) => Promise<any> // fetches current resource && setsCurrentResource
}

const CURRENT_USER_QUERY = gql`
  query User($id: ID!) {
    User(id: $id){
      id
      email
      name
      image
      roles
    }
  }
`

const store = localStorageStore()

const credentials: Credentials = {
  clearCurrentResource: () => store.removeItem('currentResource'),
  getCurrentResource: () => store.getItem('currentResource'),
  setCurrentResource: (r: {[k:string]: any}) => store.setItem('currentResource', r),
  clearAuthHeaders: () => store.removeItem('authCredentials'),
  getAuthHeaders: () => store.getItem('authCredentials'),
  setAuthHeaders: (headers: {[k:string]: any}) => store.setItem('authCredentials', headers),
  clearAppConfig: () => store.removeItem('groovestackAppConfig'),
  getAppConfig: () => store.getItem('groovestackAppConfig'),
  setAppConfig: (appConfig: {[k:string]: any}) => store.setItem('groovestackAppConfig', appConfig),
}

credentials.hydrateCurrentResource = async (client: ApolloClient<NormalizedCacheObject>) => {
  try {
    const { data, errors} = await client.query({
      query: CURRENT_USER_QUERY,
      variables: { id: 'me' },
      fetchPolicy: 'no-cache'
    })

    if (errors && errors.length > 0) throw new Error(errors[0].message)

    credentials.setCurrentResource(data.User)
  } catch (error) {
    console.log('error', error)
  }

  return credentials.getCurrentResource()
}

export { credentials as defaultCredentials }
