import { Admin, Resource } from 'react-admin'

// Near-ideal import format
// import { Jobs } from '@core/jobs'

// Source Code import
import { Comments } from '@moonlight-labs/core-comments-fe'
import { Jobs } from '@moonlight-labs/core-jobs-fe'
import { Notifications } from '@moonlight-labs/core-notifications-fe'
import { Webhooks } from '@moonlight-labs/core-webhooks-fe'
// Wireframed Version of the resource (Local)
// Uncomment this to swap in the earlier version
// import { Jobs } from './jobs/resource'

import { HomeView } from '@moonlight-labs/core-config-fe'
import { mockAuthProvider, mockDataProvider } from './data/mock-providers'
import { CustomLayout } from './layout/CustomLayout'
import theme from './layout/theme'
import { Company } from './resources/company'
import { User } from './resources/user'
// import { Company } from './resources/company'

const authProvider = await mockAuthProvider()

import { pkg as CoreBasePkg } from '@moonlight-labs/core-base-fe'
import { pkg as CoreJobsPkg } from '@moonlight-labs/core-jobs-fe'
import { pkg as CoreWebhooksPkg } from '@moonlight-labs/core-webhooks-fe'

const DashboardView = () => (
  <HomeView modules={[CoreBasePkg, CoreJobsPkg, CoreWebhooksPkg]} />
)

function AdminApp() {
  // const lineFilters = [
  //   <SelectInput
  //     source="account"
  //     choices={[
  //       { id: 'aqd_treasury', name: 'AQD Treasury' },
  //       { id: 'aqd_tokens', name: 'AQD Tokens' },
  //     ]}
  //   />,
  // ]

  // const versionFilters = [
  //   <DateInput source="created_at_lte" label="Before" />,
  //   <DateInput source="created_at_gte" label="After" />,
  //   <ReferenceInput
  //     alwaysOn
  //     label="Actor"
  //     source="actor_id"
  //     reference="User" // to do: make parametric
  //     perPage={10}
  //   >
  //     <AutocompleteInput />
  //   </ReferenceInput>,
  // ]

  return (
    <Admin
      disableTelemetry
      dataProvider={mockDataProvider}
      authProvider={authProvider}
      // loginPage={LoginPage}
      theme={theme}
      dashboard={DashboardView}
      layout={CustomLayout}
    >
      <Resource
        name="User"
        icon={User.Icon}
        edit={User.Edit}
        list={User.List}
        recordRepresentation="name"
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

      <Resource
        name="Job"
        icon={Jobs.Icon}
        edit={Jobs.Edit}
        list={Jobs.List}
        recordRepresentation={Jobs.resourceRepresentation}
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

      <Resource
        name="Notification"
        icon={Notifications.Icon}
        list={Notifications.List}
        edit={Notifications.Edit}
      />
    </Admin>
  )
}

export default AdminApp

// <Resource
//   key="admin-lines-resource"
//   name="Line"
//   // icon={Lines.Icon}
//   options={{ label: 'Ledger Lines', menu: 'admin' }}
//   show={Lines.Show}
//   list={Lines.List}
//   // list={
//   //   <Lines.List tableProps={{ filters: lineFilters }}>
//   //     // <TextField label="Account" source="accountIdentifier" sortable={false} />
//   //     <AccountScopeReferenceField source="Scope" />
//   //     <TextField source="scope" sortable={false} />
//   //   </Lines.List>
//   // }
// />

// <Resource
//   name="Version"
//   icon={Versions.Icon}
//   list={
//     <Versions.List
//       tableProps={{ filters: versionFilters }}
//       // changesDisplayed={2}
//     />
//   }
//   show={Versions.Show}
// />

{
  /* <Resource name="Webhook" list={ListGuesser} /> */
}
{
  /* <Resource name="Lookups" list={ListGuesser} /> */
}
