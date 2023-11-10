import { ApolloClient, NormalizedCacheObject, gql } from '@apollo/client'
import { AuthProvider } from 'react-admin'

import { liveAuthProviderFactory as LiveFactory } from './liveFactory'
import { mockAuthProvider as Mock } from './mock'
import { Credentials } from '../../credentials'

export class Providers {
  static BaseFactory = LiveFactory
  static Mock = Mock
}

export type AuthProviderFactoryType = (
  params: { 
    credentials?: Credentials, 
    client?: ApolloClient<NormalizedCacheObject>, 
    resource?: string, 
    requiredRole?: string 
  }) => Promise<AuthProvider>