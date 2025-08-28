import { Typography } from '@mui/material'
import { Datagrid, InfiniteList, NumberField, TextField } from 'react-admin'
import { FauxInput } from '../../react-admin/inputs/FauxInput'

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

// const ListActions = () => (
//   <TopToolbar>
//     <RefreshButton />
//   </TopToolbar>
// )

// TODO: this list gets filtered when the Jobs list is filtered (ie Errored)
export const WorkersTable = () => {
  return (
    <InfiniteList
      filters={[
        <FauxInput key="title" source="title" alwaysOn>
          <Typography variant="h6">Workers</Typography>
        </FauxInput>,
      ]}
      // actions={<ListActions />}
      // filter={{}}
      exporter={false}
      resource="JobLocker"
      disableSyncWithLocation
    >
      <Datagrid bulkActionButtons={false} rowClick={false}>
        <TextField source="host" />
        <TextField source="pid" />
        <NumberField source="workers" />
      </Datagrid>
    </InfiniteList>
  )
}
