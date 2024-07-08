// import {
//   MoneyField,
//   StatusInput,
//   TimeAgoField,
// } from '@groovestack/base'
import {
  Datagrid,
  List,
  NumberField,
  ReferenceManyCount,
  TextField,
  SimpleShowLayout,

  // WrapperField,
} from 'react-admin'

export const TestShow = () => {
  return (
  <SimpleShowLayout record={{ id: 1, name: 'foo', address: 'bar' }}>
    <TextField source="name" />
    <TextField source="address" />
  </SimpleShowLayout>)
}

export const CompanyList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" sx={{ fontWeight: 'bold' }} />
      <TextField source="address" />

      <ReferenceManyCount
        label="Comments"
        reference="Comment"
        target="resource_id"
      />

      <ReferenceManyCount
        label="Changes"
        reference="Version"
        target="resource_id"
      />

      <NumberField
        source={'share_price'}
        options={{
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
        }}
      />
{/* 
      <MoneyField source="share_price" />
      <MoneyField source="market_cap" />

      <WrapperField source='status' label="status">
        <StatusInput source="status" label={false} />
      </WrapperField>

      <TimeAgoField source="created_at" /> */}
    </Datagrid>
  </List>
)
