import { Admin, Resource } from 'react-admin'

// Near-ideal import format
// import { CoreJobs } from '@core/jobs'

// Source Code import
import { CoreJobs } from '../../core-jobs-fe/src/core-jobs'
// import { CoreAccounting } from 'core-accounting-fe'
import { CoreAccounting} from '../../core-accounting-fe/src/core-accounting'

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

      <Resource
        key="admin-lines-resource"
        name="lines"
        // icon={Jobs.Icon}
        options={[{ label: 'Lines', menu: 'admin' }]}
        show={<CoreAccounting.Lines.Show />}
        list={<CoreAccounting.Lines.List />}
      />  

    </Admin>
  )
}

export default AdminApp
