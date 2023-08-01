import { FC } from 'react'
import {
  Datagrid,
  List,
  ReferenceManyField,
  TextField,
  useRecordContext,
} from 'react-admin'
import { MoneyField } from './MoneyField'

import { TimeAgoField } from '@moonlight-labs/core-base-fe'

export const ReferenceManyLines: FC<{
  children?: any
  tableProps?: any
  datagridProps?: any
}> = ({ children, tableProps, datagridProps }) => {
  const record = useRecordContext()
  return (
    <ReferenceManyField
      key={record.id}
      reference="Line"
      target="scope"
      // record={record}
    >
      {/* A list within a reference field doesnt normally work (it ignores the target, but you can reset the target w/ filter, and filter for values where the scope is equal to the current record id (user.id)) */}
      <List exporter={false} filter={{ scope: record.id }} {...tableProps}>
        <Datagrid bulkActionButtons={false}>
          <TextField source="code" sortable={false} />
          <MoneyField source="amount" />
          <MoneyField source="balance" />
          {children}
          <TimeAgoField label="Created" source="createdAt" />
        </Datagrid>
      </List>
    </ReferenceManyField>
  )
}
