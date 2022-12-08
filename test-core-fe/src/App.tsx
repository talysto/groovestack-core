import { Admin, Resource } from 'react-admin'

// Near-ideal import format
// import { CoreJobs } from '@core/jobs'

// Source Code import
import { CoreJobs } from '../../core-jobs-fe/src/core-jobs'
const Jobs = CoreJobs.Resource

// Wireframed Version of the resource (Local)
// Uncomment this to swap in the earlier version
// import { Jobs } from './jobs/resource'


import dataProvider from './mock-data-provider'

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
      // dashboard={HomeView}
      // layout={CustomLayout}
    >

      <Resource
        key="admin-jobs-resource"
        name="jobs"
        icon={Jobs.Icon}
        options={[{ label: 'Job Queue', menu: 'admin' }]}
        edit={<Jobs.Edit />}
        list={<Jobs.List />}
      />

    </Admin>
  )
}

export default AdminApp
