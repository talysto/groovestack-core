import { Datagrid, InfiniteList, NumberField, TextField } from 'react-admin'
import { TypographyInput } from '../../react-admin/inputs/TypographyInput'

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
        <TypographyInput key="title" source="title" alwaysOn>
          Workers
        </TypographyInput>,
      ]}
      // actions={<ListActions />}
      // filter={{}}
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
