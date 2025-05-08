import { Admin, localStorageStore, Resource } from 'react-admin'
import { Box } from '@mui/material'

// Source Code import
import { Auth } from '@groovestack/auth'
import { GroovestackDash } from '@groovestack/config'
import { Comments } from '@groovestack/comments'
import { Jobs } from '@groovestack/jobs'
import { Versions } from '@groovestack/versions'
import { Webhooks } from '@groovestack/webhooks'

import { mockDataProvider, mockAuthProvider, credentials } from './data/mock-providers'
import { Company } from './resources/company'

// import { pkg as CoreBasePkg } from '@groovestack/base'
// import { pkg as CoreJobsPkg } from '@groovestack/jobs'
// import { pkg as CoreWebhooksPkg } from '@groovestack/webhooks'

const authProvider = await mockAuthProvider() // await Auth.Providers.Mock(params)

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
      appInit={true} 
      Headline={AppInitHeadline} 
    />
  )
}

const store = localStorageStore()

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
      store={store}
      requireAuth
      darkTheme={null}
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

      <Resource
        name={Jobs.Name}
        icon={Jobs.Icon}
        list={Jobs.List}
        edit={Jobs.Edit}
      />

      <Resource
        name="Version"
        icon={Versions.Icon}
        list={Versions.List}
        show={Versions.Show}
      />

      {/* <Resource name="JobLocker" />
      <Resource name="JobStat" /> */}

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