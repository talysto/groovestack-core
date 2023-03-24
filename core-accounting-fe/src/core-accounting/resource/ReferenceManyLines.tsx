import React, { FC } from "react"
import { ReferenceManyField, TextField, Datagrid, useRecordContext, SelectInput, List, Filter, TextInput, ResourceContextProvider, ListBase, ListToolbar } from "react-admin"
import { MoneyField } from "./MoneyField"
import { TimeAgoField } from "./TimeAgoField"

export const ReferenceManyLines: FC<{ children?: any }> = ({ children }) => {
  const record = useRecordContext()

  const lineFilters = [
    <SelectInput
      alwaysOn
      source="code"
      choices={[
        { id: 'buy_aqd', name: 'Buy AQD' },
        { id: 'spend_aqd', name: 'Spend AQD' },
      ]}
    />
  ];

  return (
    <ReferenceManyField
      key={record.id}
      reference="Line"
      target="scope"
      // record={record}
    >
      {/* A list within a reference field doesnt normally work (it ignores the target, but you can reset the target w/ filter, and filter for values where the scope is equal to the current record id (user.id)) */}
      <List exporter={false} filter={{ scope: record.id }} filters={lineFilters} >

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