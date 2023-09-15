import {
  ChipField,
  Datagrid,
  FieldProps,
  List,
  SearchInput,
  TextField,
  TextInput,
  useRecordContext,
} from 'react-admin'
import { SourceField } from './SourceField'
import { TimeAgoField, ToggleButtonInput } from '@moonlight-labs/core-base-fe'

const IdField = (props: FieldProps) => {
  const record = useRecordContext()
  return record ? <>{record.id.toString().slice(0, 6)}</> : <>{'...'}</>
}
IdField.defaultProps = { label: 'ID', source: 'id' }

const filters = [
  // <Typography variant="h4" alwaysOn>Web Hooks<br/></Typography>,
  <SearchInput source="q" alwaysOn />,
  <ToggleButtonInput label={false} alwaysOn source="status" choices={[{id: '', name: 'All'},{id: 'processed', name: 'Processed'}, {id: 'received', name: 'Received'}]} />
]


export const WebhookTable = () => (
  <List
    filters={filters}
    exporter={false}
    sort={{ field: 'created_at', order: 'DESC' }}
  >
    <Datagrid bulkActionButtons={false} rowClick={'show'}>
      <IdField sortable={false} />
      <SourceField source="source" sortable={false} />
      <TextField source="event" sortable={false} />
      <ChipField source="status" size="small" sortable={false} />
      <TimeAgoField source="created_at" label="Created" />
    </Datagrid>
  </List>
)
