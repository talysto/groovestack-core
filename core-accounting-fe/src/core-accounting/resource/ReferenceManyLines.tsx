import React, { FC } from "react"
import { ReferenceManyField, TextField, Datagrid, useRecordContext, SelectInput, List, Filter, TextInput, ResourceContextProvider, ListBase, ListToolbar } from "react-admin"
import { MoneyField } from "./MoneyField"

import { CoreBase } from '../../../../core-base-fe/src/core-base'
const CoreTimeAgoField = CoreBase.CoreTimeAgoField

export const ReferenceManyLines: FC<{ children?: any, tableProps?: any, datagridProps?: any }> = ({ children, tableProps, datagridProps }) => {
  const record = useRecordContext()
  return (
    <ReferenceManyField
      key={record.id}
      reference="Line"
      target="scope"
      // record={record}
    >
      {/* A list within a reference field doesnt normally work (it ignores the target, but you can reset the target w/ filter, and filter for values where the scope is equal to the current record id (user.id)) */}
      <List exporter={false} filter={{ scope: record.id }} {...tableProps} >

        <Datagrid bulkActionButtons={false}  >
          <TextField source="code" sortable={false} />
          <MoneyField source="amount" />
          <MoneyField source="balance" />
          {children}
          <CoreTimeAgoField label="Created" source="createdAt" />
        </Datagrid>
      </List>
    </ReferenceManyField>

  )

}