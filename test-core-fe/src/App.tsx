import { Admin, AutocompleteInput, DateInput, EditGuesser, ListGuesser, ReferenceInput, Resource, SelectInput } from 'react-admin'

// Near-ideal import format
// import { CoreJobs } from '@core/jobs'

// Source Code import
import { CoreBase } from 'core-base-fe'
import { CoreJobs } from 'core-jobs-fe'
import { CoreAccounting } from 'core-accounting-fe'
import { CoreComments } from 'core-comments-fe'
import { CoreVersions } from 'core-versions-fe'

const Jobs = CoreJobs.Jobs
const Lines = CoreAccounting.Lines
const Comments = CoreComments.Comments
const Versions = CoreVersions.Versions

// Wireframed Version of the resource (Local)
// Uncomment this to swap in the earlier version
// import { Jobs } from './jobs/resource'

import { mockDataProvider } from './data/mock-data-provider'
import { HomeView } from './pages/HomeView'
import { Company } from './resources/company'
import { User } from './resources/user'

import SvgIcon from '@mui/material/SvgIcon/SvgIcon';

const normalizeIcon = (Icon: typeof SvgIcon) => {
  return ((Icon as any).default ? (Icon as any).default : Icon['default']) as typeof SvgIcon;
}

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


  const lineFilters = [
    <SelectInput
      source="account"
      choices={[
        { id: 'aqd_treasury', name: 'AQD Treasury' },
        { id: 'aqd_tokens', name: 'AQD Tokens' },
      ]}
    />
  ];

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
        list={<Comments.List />}
        edit={Comments.Edit}
      />

      <Resource
        key="admin-lines-resource"
        name="Line"
        icon={Lines.Icon}
        options={{ label: 'Ledger Lines', menu: 'admin' }}
        show={Lines.Show}
        list={
          <Lines.List
            tableProps={{ filters: lineFilters }}
          >
            {/* <TextField label="Account" source="accountIdentifier" sortable={false} />
            <AccountScopeReferenceField source="Scope" />
            <TextField source="scope" sortable={false} /> */}
          </Lines.List>
        }
      />

      <Resource
        name="Version"
        // icon={normalizeIcon(CoreVersions.Versions.Icon)}
        icon={Versions.Icon}
        list={<Versions.List tableProps={{ filters: versionFilters }} />}
        show={Versions.Show}
      />

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
