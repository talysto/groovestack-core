import React from 'react'
import { Admin, Resource } from 'react-admin'
import { Jobs } from '@moonlight-labs/core-jobs-fe'

import { mockAuthProvider, mockDataProvider } from './mockDataProvider/mock-providers'
import { CustomLayout } from './CustomLayout'
import theme from './theme'
import { HomeView } from './HomeView'

const authProvider = await mockAuthProvider()

export const AdminApp = () => {
  return (
    <Admin
    disableTelemetry
    dataProvider={mockDataProvider}
    authProvider={authProvider}
    // loginPage={LoginPage}
    theme={theme}
    dashboard={HomeView}
    layout={CustomLayout}
  >
      <Resource
        name="Job"
        icon={Jobs.Icon}
        edit={Jobs.Edit}
        list={Jobs.List}
        recordRepresentation={Jobs.resourceRepresentation}
      />
    </Admin>
  )
}
