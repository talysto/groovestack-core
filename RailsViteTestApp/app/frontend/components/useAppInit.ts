import { useEffect, useState } from 'react'
import { AuthProvider, DataProvider } from 'react-admin'
import { Auth } from '@groovestack/auth'
import { gql } from '@apollo/client'

import { client } from './client'
import { initDataProvider } from './dataProvider'

const QUERY_APP_CONFIG = gql`
  query {
    AppConfig
  }
`

export const useAppInit = () => {
  const [dataProvider, setDataProvider] = useState<DataProvider | null>()
  const [authProvider, setAuthProvider] = useState<AuthProvider | null>()
  const [appConfig, setAppConfig] = useState()

  useEffect(() => {
    client.query({ query: QUERY_APP_CONFIG }).then(({ data: { AppConfig }}) => {
      setAppConfig(AppConfig)
      Auth.Credentials.setAppConfig(AppConfig)
    })

    Auth.RA.Providers.BaseFactory({ 
      client: client,
      credentials: Auth.Credentials,
      resource: 'user',
      // requiredRole: 'admin',
    }).then(authProvider => setAuthProvider(authProvider))

    initDataProvider().then((graphQlDataProvider) =>
      setDataProvider(() => graphQlDataProvider),
    )
  }, [])

  return { loading: !(appConfig && authProvider && dataProvider) , appConfig, authProvider, dataProvider }
}