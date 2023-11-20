// import { TimeAgoField } from '@moonlight-labs/core-base-fe'
import {
  Datagrid,
  FilterButton,
  List,
  NumberField,
  TextInput,
  TopToolbar,
  WrapperField,
} from 'react-admin'

import { TimeAgoField } from '@moonlight-labs/core-base-fe'
import { UserIdField } from '../../../components/UserIdField'
import { EnabledIdentitiesIcons } from '../../identities/table'

const filters = [<TextInput label="Search" source="q" alwaysOn />]
const ListActions = () => (
  <TopToolbar>
    {/* <SelectColumnsButton /> */}
    <FilterButton />
    {/* <CreateButton/> */}
    {/* <ExportButton/> */}
  </TopToolbar>
)

const BulkActionButtons = () => (
  <>
    {/* default bulk delete action */}
    {/* <BulkDeleteButton /> */}
  </>
)

export const UserTable = () => (
  <List
    actions={<ListActions />}
    exporter={false}
    sort={{ field: 'current_sign_in_at', order: 'DESC' }}
    filters={filters}
  >
    <Datagrid bulkActionButtons={<BulkActionButtons />} rowClick={'show'}>
      <UserIdField />
      <TimeAgoField source="last_login_at" label="Last Login" />
      <NumberField source="sign_in_count" label="Sign Ins" />
      <WrapperField label="Identities">
        <EnabledIdentitiesIcons />
      </WrapperField>
    </Datagrid>
  </List>
)
