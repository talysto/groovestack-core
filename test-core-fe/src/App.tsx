import { Admin, EditGuesser, ListGuesser, Resource } from 'react-admin'

// Near-ideal import format
// import { CoreJobs } from '@core/jobs'

// Source Code import
import { CoreJobs } from 'core-jobs-fe'
const Jobs = CoreJobs.Resource

import { CoreComments } from 'core-comments-fe'
const Comments = CoreComments.Resource

// Wireframed Version of the resource (Local)
// Uncomment this to swap in the earlier version
// import { Jobs } from './jobs/resource'

import dataProvider from './data/mock-data-provider'
import { HomeView } from './pages/HomeView'

// export default {
//   title: 'CORE/React Admin',
// }

// export const Resources = (args) => <AdminApp {...args} />

function AdminApp() {
  return (
    <Admin
      disableTelemetry
      dataProvider={dataProvider}
      // authProvider={config.authProvider}
      // loginPage={LoginPage}
      // theme={darkTheme}
      dashboard={HomeView}
      // layout={CustomLayout}
    >
      <Resource
        name="jobs"
        icon={Jobs.Icon}
        // options={{ label: 'CORE::Jobs'}}
        edit={Jobs.Edit}
        list={Jobs.List}
      />

      <Resource
        name="Comment"
        icon={Comments.Icon}
        list={Comments.List}
        edit={Comments.Edit}
      />

      <Resource name="webhooks" list={ListGuesser} />
      <Resource name="Lookups" list={ListGuesser} />
      <Resource name="Accounts" list={ListGuesser} />
      <Resource name="Account Transactions" list={ListGuesser} />
      <Resource name="versions" list={ListGuesser} />

      <Resource
        name="User"
        edit={EditGuesser}
        list={ListGuesser}
        recordRepresentation="name"
      />

      <Resource
        name="Company"
        edit={EditGuesser}
        list={ListGuesser}
        recordRepresentation="name"
      />
    </Admin>
  )
}

export default AdminApp
