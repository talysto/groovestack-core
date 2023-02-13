import React from 'react'
import { Admin, ReferenceField, Resource, SelectArrayInput, TextField, useRecordContext } from 'react-admin'

// Near-ideal import format
// import { CoreJobs } from '@core/jobs'

// Source Code import
// import { CoreJobs } from '../../core-jobs-fe/src/core-jobs'
// import { CoreAccounting } from 'core-accounting-fe'
import { CoreAccounting} from '../../core-accounting-fe/src/core-accounting'

import buildGraphQLProvider from 'ra-data-graphql-simple';

// const Jobs = CoreJobs.Resource

// Wireframed Version of the resource (Local)
// Uncomment this to swap in the earlier version
// import { Jobs } from './jobs/resource'


// import dataProvider from './mock-data-provider'

// export default {
//   title: 'CORE/React Admin',
// }

// export const Resources = (args) => <AdminApp {...args} />

const lineFilters = [
  <SelectArrayInput 
    source="code" 
    choices={[
      { id: 'buy_aqd', name: 'Buy AQD' },
      { id: 'spend_aqd', name: 'Spend AQD' },
    ]}
  />
];

const AccountScopeReferenceField = () => {
  const record = useRecordContext()
  if (!record) return null 
  return (
    <ReferenceField
      label="Scope"
      reference={record.scopeDetail.model}
      source="scopeDetail.id"
    >
      <TextField source="name" />
    </ReferenceField>
  )
}

function AdminApp() {
  const [dataProvider, setDataProvider] = React.useState<any>(null);

  React.useEffect(() => {
    buildGraphQLProvider({ clientOptions: { uri: 'http://rails6-sample.test/graphql' } })
      .then(graphQlDataProvider => setDataProvider(() => graphQlDataProvider));
  }, []);

  if (!dataProvider) return <div>Loading</div>

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

      {/* <Resource
        key="admin-jobs-resource"
        name="jobs"
        icon={Jobs.Icon}
        options={[{ label: 'Job Queue', menu: 'admin' }]}
        edit={<Jobs.Edit />}
        list={<Jobs.List />}
      /> */}

      <Resource
        key="admin-lines-resource"
        // name="lines"
        name="Line"
        // icon={Jobs.Icon}
        options={[{ label: 'Lines', menu: 'admin' }]}
        show={<CoreAccounting.Lines.Show />}
        list={
          <CoreAccounting.Lines.List 
            tableProps={{filters: lineFilters}} 
          >
            <TextField label="Account" source="accountIdentifier" sortable={false} />
            <AccountScopeReferenceField source="Scope" />
            {/* <TextField source="scope" sortable={false} /> */}
          </CoreAccounting.Lines.List>
        }
      />  

      <Resource key="org-unit" name="OrgUnit" />

    </Admin>
  )
}

export default AdminApp
