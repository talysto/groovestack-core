import {
  PolymorphicReferenceField,
  TimeAgoField,
  ToggleButtonInput,
} from '@moonlight-labs/core-base-fe'
import {
  ChipField,
  Datagrid,
  FunctionField,
  List,
  NumberField,
  RaRecord,
  TextField,
  TextInput,
  WrapperField,
  useRecordContext,
  UpdateButton,
  BooleanInput
} from 'react-admin'

// const IdField = () => {
//   const record = useRecordContext()
//   return record ? <>{record.id.toString().slice(0, 6)}</> : <>{'...'}</>
// }
// IdField.defaultProps = { label: 'ID', source: 'id' }

const adminFilters = [
  // <Typography variant="h4" alwaysOn>Web Hooks<br/></Typography>,
  <TextInput label="Search" source="q" alwaysOn />,
  <ToggleButtonInput alwaysOn source="kind" choices={[{id: 'Global', name: 'Global'}, {id: 'Task', name: 'Task'}, {id: 'Simple', name: 'Simple'}]} />,
  <ToggleButtonInput alwaysOn source="status" choices={[{id: 'draft', name: 'Draft'}, {id: 'upcoming', name: 'Upcoming'}, {id: 'Live', name: 'Live'}, {id: 'expired', name: 'Expired'}]} />,
]

const userFilters = [
  // <Typography variant="h4" alwaysOn>Web Hooks<br/></Typography>,
  <TextInput label="Search" source="q" alwaysOn />,
]

const UserList = () => {
  const to = useRecordContext()

  console.debug('to', to)

  return (
    <List
      resource="Notification"
      // actions={false}
      filters={userFilters}
      filter={{to_id: to.id}}
      exporter={false}
      // sort={{ field: 'created_at', order: 'DESC' }}
    >
      <Datagrid bulkActionButtons={false}>
        <WrapperField label="Message">
          <ChipField source="kind" />
          <TextField source="title" sx={{ fontWeight: 'bold', display: 'block' }} />
          <TextField source="description" />
        </WrapperField>

        {/* <ChipField source="status" size="small" /> */}
        {/* <BooleanInput source="read" /> */}
        <UpdateButton label="Mark as Read" data={{}} />
      </Datagrid>
    </List>
  )
}


export const NotificationTable = () => {
  const to = useRecordContext()

  if (to) return <UserList />

  return (
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
          <TextField source="title" sx={{ fontWeight: 'bold', display: 'block' }} />
          <TextField source="description" />
        </WrapperField>

        {/* <ChipField source="status" size="small" /> */}

        <FunctionField
          label="Read"
          render={(record: RaRecord) => {
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
}
