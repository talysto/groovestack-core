import { Admin, EditGuesser, ListGuesser, Resource } from 'react-admin'

// Near-ideal import format
// import { CoreJobs } from '@core/jobs'

// Source Code import
import { CoreJobs } from 'core-jobs-fe'
const Jobs = CoreJobs.Resource

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


      <Resource name="webhooks" list={ListGuesser} />
      <Resource name="Lookups" list={ListGuesser} />
      <Resource name="Accounts" list={ListGuesser} />
      <Resource name="Account Transactions" list={ListGuesser} />
      <Resource name="versions" list={ListGuesser} />
      <Resource name="comments" list={ListGuesser} />

      <Resource
        name="users"
        edit={EditGuesser}
        list={ListGuesser}
      />

    </Admin>
  )
}

export default AdminApp
