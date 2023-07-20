import {
  ChipField,
  Datagrid,
  DateField,
  List,
  TextField,
  TextInput,
  useRecordContext,
} from 'react-admin'

const IdField = () => {
  const record = useRecordContext()
  return record ? <>{record.id.toString().slice(0, 6)}</> : <>{'...'}</>
}
IdField.defaultProps = { label: 'ID', source: 'id' }

const filters = [
  // <Typography variant="h4" alwaysOn>Web Hooks<br/></Typography>,
  <TextInput label="Search" source="q" alwaysOn />,
]

export const WebhookTable = () => (
  <List
    filters={filters}
    exporter={false}
    sort={{ field: 'created_at', order: 'DESC' }}
  >
    <Datagrid bulkActionButtons={false} rowClick={'show'}>
      <IdField />
      <TextField source="source" />
      <TextField source="event" />
      <ChipField source="status" size="small" />
      <DateField source="created_at" showTime />
    </Datagrid>
  </List>
)
