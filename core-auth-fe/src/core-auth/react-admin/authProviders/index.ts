import { liveAuthProviderFactory as LiveFactory } from './liveFactory'
import { mockAuthProvider as Mock } from './mock'
import { AuthProvider } from 'react-admin'

export class Providers {
  static BaseFactory = LiveFactory
  static Mock = Mock
}

type Credentials = {
  getCurrentResource: () => any
  removeCurrentResource: () => void
  setCurrentResource: (resource: any) => any // often done in hydrateCurrentResource method
  clearAuthHeaders: () => void;
  setAuthHeaders: (headers: {[k: string]: string}) => void
  hydrateCurrentResource: () => Promise<any>
}

export type AuthProviderFactoryType = (params: { resource: string, credentials: Credentials, requiredRole?: string, client: any }) => AuthProvider