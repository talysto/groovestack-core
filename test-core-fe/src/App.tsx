import { Admin, Resource } from 'react-admin'
import { Box } from '@mui/material'

// Source Code import
import { Auth } from '@groovestack/auth'
import { Comments } from '@groovestack/comments'
import { 
        // HomeView,
        GroovestackDash } from '@groovestack/config'
import { Webhooks } from '@groovestack/webhooks'

import { mockDataProvider, mockAuthProvider, credentials, 
          //defaultAppConfig
        } from './data/mock-providers'
import { Company } from './resources/company'

// import { pkg as CoreBasePkg } from '@groovestack/base'
// import { pkg as CoreJobsPkg } from '@groovestack/jobs'
// import { pkg as CoreWebhooksPkg } from '@groovestack/webhooks'

const authProvider = await mockAuthProvider() // await Auth.Providers.Mock(params)

const appInit = true

const appConfig = { 
  has_admins: true, 
  user_roles: ['admin'], 
  oauth_providers: { 
    enabled: [
      {k: 'google', path: 'users/auth/google'},
      {k: 'apple', path: 'users/auth/apple'},
    ],
    configured: [
      {k: 'google', path: 'users/auth/google'},
      {k: 'apple', path: 'users/auth/apple'},
    ]
  },
  auth_providers: { 
    enabled: [
      {k: 'google', path: 'users/auth/google'},
      {k: 'apple', path: 'users/auth/apple'},
      {k: 'email' }
    ],
    configured: [
      {k: 'google', path: 'users/auth/google'},
      {k: 'apple', path: 'users/auth/apple'},
      {k: 'email' }
    ]
  }
}

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
    <Auth.RA.LoginPage 
      {...props} 
      credentials={credentials} 
      appInit={appInit} 
      Headline={AppInitHeadline} 
    />
  )
}

function AdminApp() {
  // credentials.setAppConfig(defaultAppConfig)
  credentials.setAppConfig(appConfig)

  return (
    <Admin
      disableTelemetry
      dataProvider={mockDataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
      dashboard={GroovestackDash}
      layout={Auth.RA.Layout}
      requireAuth
      darkTheme={undefined}
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