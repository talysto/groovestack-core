import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { AuthProvider } from 'react-admin'

import { liveAuthProviderFactory as LiveFactory } from './liveFactory'
import { mockAuthProvider as Mock } from './mock'

export class Providers {
  static BaseFactory = LiveFactory
  static Mock = Mock
}

export type Credentials = {
  getCurrentResource: () => any
  removeCurrentResource: () => void
  setCurrentResource: (resource: any) => any // often done in hydrateCurrentResource method
  clearAuthHeaders: () => void;
  setAuthHeaders: (headers: {[k: string]: string}) => void
  hydrateCurrentResource?: () => Promise<any> // fetches current resource && setsCurrentResource
}

export type AuthProviderFactoryType = (params: { credentials: Credentials, client?: ApolloClient<NormalizedCacheObject>, resource?: string, requiredRole?: string }) => Promise<AuthProvider>