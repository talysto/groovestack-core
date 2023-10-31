import {
  Datagrid,
  FilterButton,
  List,
  NumberField,
  TextInput,
  TopToolbar,
} from 'react-admin'

import { UserIdField } from '../UserIdField'

const filters = [<TextInput label="Search" source="q" alwaysOn />]
const ListActions = () => (
  <TopToolbar>
    {/* <SelectColumnsButton /> */}
    <FilterButton />
    {/* <CreateButton/> */}
    {/* <ExportButton/> */}
  </TopToolbar>
)

import { TimeAgoField } from '@moonlight-labs/core-base-fe'
import { MergeButton } from './MergeButton'

const BulkActionButtons = () => (
  <>
    <MergeButton />
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

      <NumberField source="memberships_count" label="Memberships" />
      <NumberField source="leaderships_count" label="Leaderships" />

      <TimeAgoField source="created_at" label="Registered" />
      <TimeAgoField source="current_sign_in_at" label="Active" />
    </Datagrid>
  </List>
)
