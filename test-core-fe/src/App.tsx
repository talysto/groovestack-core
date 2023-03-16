import { Admin, EditGuesser, ListGuesser, ReferenceField, Resource, SelectArrayInput, TextField, useRecordContext } from 'react-admin'

// Near-ideal import format
// import { CoreJobs } from '@core/jobs'

// Source Code import
import { CoreJobs } from 'core-jobs-fe'
import { CoreAccounting} from 'core-accounting-fe'

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

      <Resource
        key="admin-lines-resource"
        // name="lines"
        name="Line"
        // icon={Jobs.Icon}
        options={[{ label: 'Lines', menu: 'admin' }]}
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
      {/* <Resource key="org-unit" name="OrgUnit" /> */}

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
