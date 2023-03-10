import { Admin, ListGuesser, Resource } from 'react-admin'

// Near-ideal import format
// import { CoreJobs } from '@core/jobs'

// Source Code import
import { CoreJobs } from 'core-jobs-fe'
const Jobs = CoreJobs.Resource

// Wireframed Version of the resource (Local)
// Uncomment this to swap in the earlier version
// import { Jobs } from './jobs/resource'

import dataProvider from './mock-data-provider'
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
        options={[{ label: 'Job Queue'}]}
        edit={Jobs.Edit}
        list={Jobs.List}
      />

    </Admin>
  )
}

export default AdminApp
