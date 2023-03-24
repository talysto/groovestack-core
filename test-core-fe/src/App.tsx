import { Admin, EditGuesser, ListGuesser, Resource } from 'react-admin'

// Near-ideal import format
// import { CoreJobs } from '@core/jobs'

// Source Code import
import { CoreJobs } from 'core-jobs-fe'
import { CoreAccounting } from 'core-accounting-fe'

const Jobs = CoreJobs.Resource



import { CoreComments } from 'core-comments-fe'
const Comments = CoreComments.Resource

import { CoreVersions } from 'core-versions-fe'
const Versions = CoreVersions.Resource
const Accounting = CoreAccounting.Resource
// Wireframed Version of the resource (Local)
// Uncomment this to swap in the earlier version
// import { Jobs } from './jobs/resource'

import { mockDataProvider } from './data/mock-data-provider'
import { HomeView } from './pages/HomeView'
import { Company } from './resources/company'
import { User } from './resources/user'

// export default {
//   title: 'CORE/React Admin',
// }

// export const Resources = (args) => <AdminApp {...args} />

// const lineFilters = [
//   <SelectArrayInput
//     source="code"
//     choices={[
//       { id: 'buy_aqd', name: 'Buy AQD' },
//       { id: 'spend_aqd', name: 'Spend AQD' },
//     ]}
//   />
// ];

// const AccountScopeReferenceField: React.FC<{source: string}> = ({source}) => {
//   const record = useRecordContext()
//   if (!record) return null
//   return (
//     <ReferenceField
//       label="Scope"
//       reference={record.scopeDetail.model}
//       source="scopeDetail.id"
//     >
//       <TextField source="name" />
//     </ReferenceField>
//   )
// }

function AdminApp() {
  // const [dataProvider, setDataProvider] = React.useState<any>(null);

  // React.useEffect(() => {
  //   buildGraphQLProvider({ clientOptions: { uri: 'http://rails6-sample.test/graphql' } })
  //     .then(graphQlDataProvider => setDataProvider(() => graphQlDataProvider));
  // }, []);

  // if (!dataProvider) return <div>Loading</div>

  return (
    <Admin
      disableTelemetry
      dataProvider={mockDataProvider}
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

      {/* <Resource
        name="Transfer"
        list={Accounting.List}
      /> */}

      <Resource
        key="admin-lines-resource"
        // name="lines"
        name="Line"
        // icon={Jobs.Icon}
        options={{ label: 'Ledger Lines', menu: 'admin' }}
        show={<CoreAccounting.Lines.Show />}
        list={
          <CoreAccounting.Lines.List
          // tableProps={{filters: lineFilters}}
          >
            {/* <TextField label="Account" source="accountIdentifier" sortable={false} />
            <AccountScopeReferenceField source="Scope" />
            <TextField source="scope" sortable={false} /> */}
          </CoreAccounting.Lines.List>
        }
      />

      <Resource name="Version" icon={Versions.Icon} list={Versions.List} />

      {/* <Resource key="org-unit" name="OrgUnit" /> */}

      <Resource name="webhooks" list={ListGuesser} />
      <Resource name="Lookups" list={ListGuesser} />

      <Resource
        name="User"
        edit={User.Edit}
        list={User.List}
        recordRepresentation="name"
        options={{ label: 'Users (Test)' }}
      />

      <Resource
        name="Company"
        edit={Company.Edit}
        list={Company.List}
        options={{ label: 'Companies (Test)' }}
        recordRepresentation="name"
      />
    </Admin>
  )
}

export default AdminApp
