import {
  Datagrid,
  FilterButton,
  List,
  TextInput,
  TopToolbar,
} from 'react-admin'

import { UserIdField } from '../../../components/UserIdField'

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
    </Datagrid>
  </List>
)
