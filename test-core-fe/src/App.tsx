import { Admin, Resource } from 'react-admin'
import { Box } from '@mui/material'

// Source Code import
import { Auth } from '@moonlight-labs/core-auth-fe'
import { Comments } from '@moonlight-labs/core-comments-fe'
import { HomeView } from '@moonlight-labs/core-config-fe'
import { Webhooks } from '@moonlight-labs/core-webhooks-fe'

import { mockDataProvider, mockAuthProvider } from './data/mock-providers'
import { CustomLayout } from './layout/CustomLayout'
import theme from './layout/theme'
import { Company } from './resources/company'

// import { pkg as CoreBasePkg } from '@moonlight-labs/core-base-fe'
// import { pkg as CoreJobsPkg } from '@moonlight-labs/core-jobs-fe'
// import { pkg as CoreWebhooksPkg } from '@moonlight-labs/core-webhooks-fe'

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
    <Auth.RA.LoginPage {...props} appInit={appInit} Headline={AppInitHeadline} />
  )
}

function AdminApp() {
  return (
    <Admin
      disableTelemetry
      dataProvider={mockDataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
      theme={theme}
      dashboard={HomeView}
      layout={CustomLayout}
    >
      <Resource
        name={Auth.Users.Name}
        icon={Auth.Users.Icon}
        // edit={User.Edit}
        list={Auth.Users.List}
        show={Auth.Users.Show}
        recordRepresentation="Auth Name"
        options={{ label: 'Users (Test)' }}
      />

      <Resource
        name="Company"
        icon={Company.Icon}
        edit={Company.Edit}
        list={Company.List}
        create={Company.Create}
        options={{ label: 'Companies (Test)' }}
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