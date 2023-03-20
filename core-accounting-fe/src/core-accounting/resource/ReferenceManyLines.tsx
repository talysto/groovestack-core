import React, { FC } from "react"
import { ReferenceManyField, TextField, Datagrid } from "react-admin"
import { MoneyField } from "./MoneyField"
import { TimeAgoField } from "./TimeAgoField"

export const ReferenceManyLines: FC<{children?: any}> = ({children = []}) => {
  return (
    <ReferenceManyField
      reference="Line"
      target="scope"
    >
      <Datagrid bulkActionButtons={false}>
        <TextField source="code" sortable={false} />
        <MoneyField source="amount" />
        <MoneyField source="balance" />
        {...children}
        <TimeAgoField label="Created" source="createdAt" />
      </Datagrid>
    </ReferenceManyField>
  )
}