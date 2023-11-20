import { Admin, Resource, LayoutProps } from 'react-admin'
import { Box } from '@mui/material'
import { useSearchParams, useLocation } from 'react-router-dom'

// Source Code import
import { Auth } from '@groovestack/auth'
import { Comments } from '@groovestack/comments'
import { HomeView, GroovestackLayout } from '@groovestack/config'
import { Webhooks } from '@groovestack/webhooks'

import { mockDataProvider, mockAuthProvider, credentials, defaultAppConfig } from './data/mock-providers'
// import { CustomLayout } from './layout/CustomLayout'
import { Company } from './resources/company'
import { useEffect } from 'react'

// import { pkg as CoreBasePkg } from '@groovestack/base'
// import { pkg as CoreJobsPkg } from '@groovestack/jobs'
// import { pkg as CoreWebhooksPkg } from '@groovestack/webhooks'

const authProvider = await mockAuthProvider() // await Auth.Providers.Mock(params)

const appInit = true

const AppInitHeadline = () => {
  return (
    <Box sx={{ p: 3 }}>
      <div>There are currently no registered users on your application.</div>
      <div>Be the first!</div>
    </Box>
  )
}

const LoginPage = (props: any) => {
  return (
    <Auth.RA.LoginPage {...props} credentials={credentials} appInit={appInit} Headline={AppInitHeadline} />
  )
}

const CustomLayout = (props: LayoutProps) => {
  return <GroovestackLayout LayoutProps={props} AppBarProps={{userMenu: <Auth.Users.Menu />}} />
}

function AdminApp() {
  credentials.setAppConfig(defaultAppConfig)

  return (
    <Admin
      disableTelemetry
      dataProvider={mockDataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
      dashboard={HomeView}
      layout={CustomLayout}
      requireAuth
      // theme={houseLightTheme}
    >
      <Resource
        name={Auth.Users.Name}
        icon={Auth.Users.Icon}
        // edit={User.Edit}
        list={Auth.Users.List}
        show={Auth.Users.Show}
        recordRepresentation="Auth Name"
      />

      <Resource
        name="Company"
        icon={Company.Icon}
        edit={Company.Edit}
        list={Company.List}
        create={Company.Create}
        recordRepresentation="name"
      />

      <Resource
        name="Comment"
        icon={Comments.Icon}
        list={Comments.List}
        edit={Comments.Edit}
      />

      <Resource name="JobLocker" />
      <Resource name="JobStat" />

      <Resource
        name="Webhook"
        icon={Webhooks.Icon}
        list={Webhooks.List}
        show={Webhooks.Show}
        recordRepresentation={Webhooks.recordRepresentation}
      />
    </Admin>
  )
}

export default AdminApp