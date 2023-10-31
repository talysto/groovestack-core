import { TimeAgoField } from '@moonlight-labs/core-base-fe'
import {
  Datagrid,
  InfiniteList,
  InfinitePagination,
  TextField,
  useRecordContext,
} from 'react-admin'

export const ActivitiesStream = () => {
  const record = useRecordContext()

  return (
    <InfiniteList
      resource="Activity"
      filter={{ resource_id: record.id }}
      sort={{ field: 'created_at', order: 'DESC' }}
      perPage={10}
      pagination={<InfinitePagination />}
      actions={false}
    >
      <Datagrid bulkActionButtons={false}>
        <TimeAgoField
          textAlign="right"
          sortable={false}
          source="created_at"
          label={false}
        />
        <TextField sortable={false} source="summary" />
      </Datagrid>
    </InfiniteList>
  )
}
