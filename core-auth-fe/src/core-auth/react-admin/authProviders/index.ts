import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { AuthProvider } from 'react-admin'

import { Credentials } from '../../credentials'
import { liveAuthProviderFactory as LiveFactory } from './liveFactory'
import { mockAuthProvider as Mock } from './mock'

export class Providers {
  static BaseFactory = LiveFactory
  static Mock = Mock
}

export type AuthProviderFactoryType = (params: {
  credentials?: Credentials
  client?: ApolloClient<NormalizedCacheObject>
  resource?: string
  requiredRole?: string
}) => Promise<AuthProvider>
