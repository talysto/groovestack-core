import {
  PolymorphicReferenceField,
  TimeAgoField,
  ToggleButtonInput,
} from '@groovestack/base'
import {
  ChipField,
  Datagrid,
  FunctionField,
  List,
  NumberField,
  RaRecord,
  SearchInput,
  TextField,
  WrapperField,
} from 'react-admin'

const adminFilters = [
  // <Typography variant="h4" alwaysOn>Web Hooks<br/></Typography>,
  <SearchInput placeholder="Search..." source="q" alwaysOn />,
  <ToggleButtonInput
    alwaysOn
    source="kind"
    choices={[
      { id: 'Global', name: 'Global' },
      { id: 'Task', name: 'Task' },
      { id: 'Simple', name: 'Simple' },
    ]}
  />,
  <ToggleButtonInput
    alwaysOn
    source="status"
    choices={[
      { id: 'draft', name: 'Draft' },
      { id: 'upcoming', name: 'Upcoming' },
      { id: 'Live', name: 'Live' },
      { id: 'expired', name: 'Expired' },
    ]}
  />,
]

export const AdminTable = () => (
  <List
    // actions={false}
    filters={adminFilters}
    exporter={false}
    sort={{ field: 'created_at', order: 'DESC' }}
  >
    <Datagrid bulkActionButtons={false} rowClick={'edit'}>
      <ChipField source="kind" size="small" />

      <PolymorphicReferenceField label="To" source="to" />

      <WrapperField label="Message">
        <TextField
          source="title"
          sx={{ fontWeight: 'bold', display: 'block' }}
        />
        <TextField source="description" />
      </WrapperField>

      {/* <ChipField source="status" size="small" /> */}

      <FunctionField
        label="Read"
        render={(record: RaRecord) => {
          if (!record) return null
          
          return Number.isInteger(record.read) ? (
            <NumberField source="read" />
          ) : (
            record.read && <>TRUE</>
          )
        }}
      />

      <TimeAgoField source="publish_at" label="Publish" />
      <TimeAgoField source="expire_at" label="Expires" />
    </Datagrid>
  </List>
)
