import { Datagrid, InfiniteList, NumberField, RefreshButton, TextField } from 'react-admin'
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

// const Actions = () => (
//   <CardActions>
//     <RefreshButton />
//   </CardActions>
// )

export const Workers = () => {
  return (
    <InfiniteList
      filters={[<TypographyInput alwaysOn>Workers</TypographyInput>]}
      actions={<RefreshButton />}
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
