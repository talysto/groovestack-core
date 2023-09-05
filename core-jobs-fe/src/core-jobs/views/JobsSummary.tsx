import { Datagrid, InfiniteList, NumberField, RefreshButton, TextField } from 'react-admin'
import { TypographyInput } from './TypographyInput'

// columns={[
//   { key: 'sub_class', label: 'type' },
//   { key: 'count', label: 'queued' },
//   { key: 'count_working', label: 'working' },
//   { key: 'count_errored', label: 'errors' },
// ]}
export const JobsSummary = () => {
  return (
    <InfiniteList
      filters={[<TypographyInput alwaysOn>Jobs by Type</TypographyInput>]}
      actions={<RefreshButton />}
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
