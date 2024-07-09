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
  Link
} from 'react-admin'

export const CompanyList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" sx={{ fontWeight: 'bold' }} />
      <TextField source="address" />
      <Link
        href={"www.google.com"}
        sx={{ display: 'flex', alignItems: 'center', mr: 1 }}
        rel="noreferrer"
        underline="hover"
        target="_blank"
        onClick={(event) => {
          event.stopPropagation()
        }}
      >asdf</Link>

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

      <MoneyField source="share_price" />
      <MoneyField source="market_cap" />

      <WrapperField source='status' label="status">
        <StatusInput source="status" label={false} />
      </WrapperField>

      <TimeAgoField source="created_at" />
    </Datagrid>
  </List>
)
