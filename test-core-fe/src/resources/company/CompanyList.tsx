import {
  MoneyField,
  StatusInput,
  TimeAgoField,
} from '@groovestack/base'
import {
  Datagrid,
  List,
  NumberField,
  ReferenceManyCount,
  TextField,
  WrapperField,
} from 'react-admin'

export const CompanyList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="name" sx={{ fontWeight: 'bold' }} />
      <TextField source="address" />

      <ReferenceManyCount
        label="Comments"
        reference="Comment"
        target="resource_id"
        sx={{'& a': { textDecoration: 'none' }}}
      />

      <ReferenceManyCount
        label="Changes"
        reference="Version"
        target="resource_id"
        sx={{'& a': { textDecoration: 'none' }}}
      />

      <NumberField
        source={'share_price'}
        options={{
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
        }}
      />

      <MoneyField source="share_price" />
      <MoneyField source="market_cap" />

      <WrapperField source='status' label="status">
        <StatusInput source="status" label={false} />
      </WrapperField>

      <TimeAgoField source="created_at" />
    </Datagrid>
  </List>
)
