import {
  Admin,
  AutocompleteInput,
  DateInput,
  ReferenceInput,
  Resource,
} from 'react-admin'

// Near-ideal import format
// import { Jobs } from '@core/jobs'

// Source Code import
import { CoreJobs } from '@moonlight-labs/core-jobs-fe'
import { CoreAccounting } from '@moonlight-labs/core-accounting-fe'
import { Comments } from '@moonlight-labs/core-comments-fe'
import { CoreVersions } from '@moonlight-labs/core-versions-fe'
import { CoreWebhooks } from '@moonlight-labs/core-webhooks-fe'

const Lines = CoreAccounting.Lines
const Versions = CoreVersions.Versions
const Webhooks = CoreWebhooks.Webhooks

// Wireframed Version of the resource (Local)
// Uncomment this to swap in the earlier version
// import { Jobs } from './jobs/resource'

import { mockAuthProvider, mockDataProvider } from './data/mock-providers'
import { HomeView } from './pages/HomeView'
import { User } from './resources/user'
import { Company } from './resources/company'
import theme from './layout/theme'
import { CustomLayout } from './layout/CustomLayout'
// import { Company } from './resources/company'

const authProvider = await mockAuthProvider()

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

  const versionFilters = [
    <DateInput source="created_at_lte" label="Before" />,
    <DateInput source="created_at_gte" label="After" />,
    <ReferenceInput
      alwaysOn
      label="Actor"
      source="actor_id"
      reference="User" // to do: make parametric
      perPage={10}
    >
      <AutocompleteInput />
    </ReferenceInput>,
  ]

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
        options={{ label: 'Companies (Test)' }}
        recordRepresentation="name"
      />

      <Resource
        name="jobs"
        icon={CoreJobs.Jobs.Icon}
        // options={{ label: 'CORE::Jobs'}}
        edit={CoreJobs.Jobs.Edit}
        list={CoreJobs.Jobs.List}
      />

      <Resource
        name="Comment"
        icon={Comments.Icon}
        list={Comments.List}
        edit={Comments.Edit}
      />

      <Resource
        key="admin-lines-resource"
        name="Line"
        // icon={Lines.Icon}
        options={{ label: 'Ledger Lines', menu: 'admin' }}
        show={Lines.Show}
        list={Lines.List}
        // list={
        //   <Lines.List tableProps={{ filters: lineFilters }}>
        //     // <TextField label="Account" source="accountIdentifier" sortable={false} />
        //     <AccountScopeReferenceField source="Scope" />
        //     <TextField source="scope" sortable={false} />
        //   </Lines.List>
        // }
      />

      <Resource
        name="Version"
        icon={Versions.Icon}
        list={
          <Versions.List
            tableProps={{ filters: versionFilters }}
            // changesDisplayed={2}
          />
        }
        show={Versions.Show}
      />

      <Resource
        name="Webhook"
        icon={Webhooks.Icon}
        list={Webhooks.List}
        edit={Webhooks.Show}
      />

      {/* <Resource name="Webhook" list={ListGuesser} /> */}
      {/* <Resource name="Lookups" list={ListGuesser} /> */}
    </Admin>
  )
}

export default AdminApp
