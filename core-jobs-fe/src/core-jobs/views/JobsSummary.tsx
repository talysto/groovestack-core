import { Datagrid, InfiniteList, NumberField, RefreshButton, TextField, TopToolbar } from 'react-admin'
import { TypographyInput } from './TypographyInput'

// columns={[
//   { key: 'sub_class', label: 'type' },
//   { key: 'count', label: 'queued' },
//   { key: 'count_working', label: 'working' },
//   { key: 'count_errored', label: 'errors' },
// ]}
const ListActions = () => (
  <TopToolbar>
      <RefreshButton />
  </TopToolbar>
)

export const JobsSummary = () => {
  return (
    <InfiniteList
      filters={[<TypographyInput key="title" source="title" alwaysOn>Jobs by Type</TypographyInput>]}
      actions={<ListActions />}
      exporter={false}
      resource="JobStat"
    >
      <Datagrid bulkActionButtons={false}>
        <TextField source="sub_class" label="type" />
        <NumberField source="count" label="queued" />
        <NumberField source="count_working" label="working" />
        <NumberField source="count_errored" label="errors" />
      </Datagrid>
    </InfiniteList>
  )
}
