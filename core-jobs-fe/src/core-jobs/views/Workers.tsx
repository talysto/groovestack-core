import {
  Datagrid,
  InfiniteList,
  NumberField,
  RefreshButton,
  TextField,
  TopToolbar,
} from 'react-admin'
import { TypographyInput } from './TypographyInput'

/* <LiveTable
columns={[
  { key: 'host', render: (v: string) => v.substring(0, 6) },
  { key: 'pid' },
  { key: 'workers' },
]}
refreshData={refreshWorkersTable}
refreshInterval={30}
transform={({ data }) => data}
/> */

const ListActions = () => (
  <TopToolbar>
    <RefreshButton />
  </TopToolbar>
)

export const WorkersTable = () => {
  return (
    <InfiniteList
      filters={[
        <TypographyInput key="title" source="title" alwaysOn>
          Workers
        </TypographyInput>,
      ]}
      actions={<ListActions />}
      exporter={false}
      resource="JobLocker"
    >
      <Datagrid bulkActionButtons={false}>
        <TextField source="host" />
        <TextField source="pid" />
        <NumberField source="workers" />
      </Datagrid>
    </InfiniteList>
  )
}
